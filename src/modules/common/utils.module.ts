import { Module } from '@nestjs/common';
import { MailService } from './mailer/mail.service';
import { ImageService } from './image_handler/image.service';

@Module({
  providers: [MailService, ImageService],
  exports: [MailService, ImageService],
})
export class UtilsModule {}
