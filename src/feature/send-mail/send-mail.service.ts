import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from './dto/send-mail.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SendMailService {
  constructor(private logger: Logger) {}

  /**
   * Send Mail
   */
  async sendMail(data: SendMailDto): Promise<any> {
    this.logger.log(`Start send mail: from ${data.destination.split(',')}`);
    const transporter = nodemailer.createTransport({
      host: 'SMTP.office365.com',
      port: 587,
      tls: {
        ciphers: 'SSLv3',
      },
      secure: false,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const html = `<h2 class="section-heading text-uppercase" style="text-align: center;">DESENVOLVIMENTO WEB COM A SEVLATECH</h2>
    <h3 class="section-subheading text-muted" style="text-align: center;">Ol&aacute; <span
        style="color: #0000ff;"><strong>$SEUNOMEAQUI</strong></span> j&aacute; recebemos sua solicita&ccedil;&atilde;o para
      aquisi&ccedil;&atilde;o do curso de desenvolvimento WEB. Em alguns instantes nossa equipe ir&aacute; entrar em contato
      via telefone.</h3>`;

    await transporter.sendMail({
      from: `"${process.env.USER_NAME}" <${process.env.USER_MAIL}>`,
      to: data.destination.split(','),
      subject: 'DESENVOLVIMENTO WEB COM A SEVLATECH ✔',
      html: html.replace('$SEUNOMEAQUI', data.name),
    });

    this.logger.log(
      `Email successfully sent, for destination:from ${data.destination.split(
        ',',
      )}`,
    );

    return {
      message: 'Email successfully sent',
    };
  }
}
