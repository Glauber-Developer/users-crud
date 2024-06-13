const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'seuemailaqui@hotmail.com',
                pass: 'seu password aqui'
            }
        });
    }

    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: 'seuemailaqui@hotmail.com',
            to,
            subject,
            text
        };

        await this.transporter.sendMail(mailOptions);
    }
}

module.exports = EmailService;
