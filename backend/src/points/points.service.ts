import { Injectable, BadRequestException, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { BlockchainService } from '../blockchain/blockchain.service';
import { User } from 'src/auth/user.entity';
import { VideoPurchase } from 'src/videos/video-purchase.entity';

@Injectable()
export class PointsService {
  constructor(
    private blockchainService: BlockchainService,
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('VIDEOSPURCHASE_REPOSITORY')
    private videosPurchaseRepository: typeof VideoPurchase,
  ) { }
  private readonly PTS_PRICE_IN_ETH = 0.000006124;

  async recharge(user, amount) {
    await this.blockchainService.addPointsToAddress(user.ethereumAddress, amount);
    return {
      message: 'Points added to wallet'
    };
  }

  async withdraw(user, amount) {
    await this.blockchainService.removePointsFromAddress(user.ethereumAddress, amount);
    return {
      message: 'Points removed to wallet'
    };
  }

  async verifyTransaction(txHash: string): Promise<any> {
    const transaction = await this.blockchainService.getTransaction(txHash);
    if (!transaction || transaction.to.toLowerCase() !== process.env.BC_CONTRACT_ADDRESS.toLowerCase()) {
      throw new BadRequestException('Invalid transaction.');
    }
    const ethAmount = parseFloat(this.blockchainService.web3.utils.fromWei(transaction.value.toString(), 'ether'));
    const ptsToAward = ethAmount / this.PTS_PRICE_IN_ETH;
    await this.blockchainService.addPointsToAddress(transaction.from, Math.floor(ptsToAward));
    return {
      message: `${ptsToAward} PTS awarded for the transaction.`
    };
  }

  async transfer(user: User, toEmail: string, amount: string, payload: string | null, transferType: 'transfer' | 'video' | 'product') {
    try {
      const receiverUser = await this.usersRepository.findOne({ where: { email: toEmail } });
      if (!receiverUser) {
        throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
      }
      await this.withdraw({ ethereumAddress: user.ethereumAddress }, amount);
      await this.recharge({ ethereumAddress: receiverUser.ethereumAddress }, amount);

      if (transferType == 'video') {
        await this.videosPurchaseRepository.create({
          buyerId: user.id,
          videoId: payload
        });
      }

      return {
        message: 'Points transfered.'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      // For other errors, send a 500 status code or customize as needed
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
