import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    
    constructor() {
        this.transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Replace with your SMTP server
        port: 587, // Replace with your SMTP port
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'hayahmam3@gmmail.com',
            pass:'' // Replace with your email
        },
        }); 
} 
  async sendMail(email: string, resetLink: string): Promise<void> {
    const mailOptions = {
      from: 'hayahmam3@gamil.com',
      to: email,
      subject: 'Password Reset',
      text: `Click here to reset your password: ${resetLink}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
