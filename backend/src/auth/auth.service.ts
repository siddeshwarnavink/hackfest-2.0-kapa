import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { BlockchainService } from '../blockchain/blockchain.service';
import { Video } from 'src/videos/videos.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('VIDEOS_REPOSITORY')
    private videosRepository: typeof Video,
    private jwtService: JwtService,
    private blockchainService: BlockchainService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signJWTForUser(user) {
    const payload = { id: user.id };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async login(user) {
    const loggedinUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    const token = await this.signJWTForUser(loggedinUser);
    return {
      token,
      profile: {
        id: loggedinUser.id,
        points: await this.blockchainService.getPoints(loggedinUser.ethereumAddress),
        username: loggedinUser.username,
        email: loggedinUser.email,
        ethereumAddress: user.ethereumAddress
      },
    };
  }

  async createAccount(user) {
    this.usersRepository.create({
      username: user.username,
      email: user.email,
      password: await bcrypt.hash(user.password, 3),
      ethereumAddress: await this.blockchainService.createAddress(),
    });

    return {
      message: 'Account created successfully!'
    };
  }

  async refreshToken(user) {
    const token = await this.signJWTForUser(user);

    return {
      token,
      profile: {
        id: user.id,
        points: await this.blockchainService.getPoints(user.ethereumAddress),
        username: user.username,
        email: user.email,
        ethereumAddress: user.ethereumAddress
      },
    };
  }

  async getProfile(user) {
    const videoCount = await this.videosRepository.count({ where: { creator: user.id } });
    const videos = await this.videosRepository.findAll({
      attributes: ['id', 'title', 'thumbnail'],
      where: { creator: user.id },
      limit: 4
    });
    return {
      profile: {
        id: user.id,
        points: await this.blockchainService.getPoints(user.ethereumAddress),
        username: user.username,
        email: user.email,

      },
      statistics: {
        videos: videoCount,
        followers: 0,
        products: 0
      },
      videos
    };
  }
}
