import { Module } from '@nestjs/common';
import { MailService } from './mailer/mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class UtilsModule {}
