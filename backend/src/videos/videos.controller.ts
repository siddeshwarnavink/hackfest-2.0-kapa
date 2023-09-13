import { Controller, Get, UseGuards, Request, Post, UseInterceptors, BadRequestException, UploadedFiles, Param, Req, Patch } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { VideosService } from './videos.service';
import { uploadOptions } from 'src/file-upload/multer.config';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getHomeFeed(@Request() req) {
    return this.videosService.getHomeFeed();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ], uploadOptions)
  )
  async postVideo(@UploadedFiles() files, @Request() req) {
    const video = files.video[0];
    const thumbnail = files.thumbnail[0];

    if (!video || !thumbnail) {
      throw new BadRequestException('Both video and thumbnail files must be provided.');
    }

    const videoData = {
      video: video.path,
      thumbnail: thumbnail.path,
      title: req.body.title,
      description: req.body.description,
      cost: req.body.cost,
      creator: req.user.id
    };
    return this.videosService.postVideo(videoData);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getVideoDetail(@Param('id') videoId: string, @Request() req) {
    return this.videosService.getVideoDetail(videoId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
    ], uploadOptions)
  )
  async updateVideoDetail(@UploadedFiles() files, @Param('id') videoId: string, @Request() req) {
    let thumbnailPath = undefined;
    if (files.thumbnail && files.thumbnail.length > 0) {
      thumbnailPath = files.thumbnail[0].path;
    }
    const videoData = {
      id: videoId,
      thumbnail: thumbnailPath,
      title: req.body.title,
      description: req.body.description,
      cost: req.body.cost,
      creator: req.user.id
    };
    return this.videosService.updateVideoDetail(videoData);
  }
}
