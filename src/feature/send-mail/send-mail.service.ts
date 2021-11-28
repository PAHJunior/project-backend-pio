import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from './dto/send-mail.dto';
import * as googleapis from 'googleapis';
import { GetAccessTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';

@Injectable()
export class SendMailService {
  constructor(private logger: Logger) {}

  /**
   * Send Mail
   */
  async sendMail(data: SendMailDto): Promise<any> {
    this.logger.log(
      `Start send mail: from ${data.destination.split(',')} - ${
        process.env.USER_MAIL
      }`,
    );

    const { token } = await this.getToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER_MAIL,
        accessToken: token,
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

  private async getToken(): Promise<GetAccessTokenResponse> {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

    const oAuth2Client = new googleapis.google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI,
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    return await oAuth2Client.getAccessToken();
  }
}
