import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './handlebars_mail_template';

interface IMailContact {
    name:string;
    email:string;
}

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string,
    variables: ITemplateVariable;
}

interface ISendMail {
    to: IMailContact;
    from?:IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EtherealMail {
    static async sendMail({to,from,subject,templateData}: ISendMail): Promise<void> {
        const accout = await nodemailer.createTestAccount();
        const mailTemplate = new HandlebarsMailTemplate();
        const transporter = nodemailer.createTransport({
            host: accout.smtp.host,
            port: accout.smtp.port,
            secure: accout.smtp.secure,
            auth: {
                user: accout.user,
                pass: accout.pass
            }
        });

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe Vendas',
                address: from?.email || 'foxcloud@apivendas.com.br'
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });

        console.log('Mensagem enviada: %s', message.messageId);
        console.log('URL: %s', nodemailer.getTestMessageUrl(message));
    }

    
}