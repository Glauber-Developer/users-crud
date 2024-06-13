const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'seuemail@gmail.com',
                pass: 'suasenha'
            }
        });
    }

    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: 'seuemail@gmail.com',
            to,
            subject,
            text
        };

        await this.transporter.sendMail(mailOptions);
    }
}

module.exports = EmailService;
