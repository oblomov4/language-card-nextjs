import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

type MailOptionsType = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

type TransportType = nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

function getTransport(): TransportType {
  return nodemailer.createTransport({
    service: 'yandex',
    auth: {
      user: 'vladisav.serebrov',
      pass: process.env.NEXT_PUBLIC_YANDEX_PASS,
    },
  });
}

function send(transport: TransportType, option: MailOptionsType): Promise<unknown> {
  return new Promise((resolve, reject) => {
    transport.sendMail(option, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
}

export async function verificationCodeSend(to: string, code: string): Promise<void> {
  try {
    const transport = getTransport();
    const mailOptions: MailOptionsType = {
      from: 'vladisav.serebrov@yandex.ru',
      to: to,
      subject: 'Language Card - Подтвердите E-mail',
      html: `
      <h1>Здравствуйте, благодарю вас за регистрацию!</h1>
      <p>Для того чтобы подтвердить ваш E-mail адрес перейдите по ссылки</p>
      <a href=${process.env.NEXT_PUBLIC_MY_LINK}/api/auth/verify?code=${code}>Подтвердить регистрацию</a>
      <br>
      <p>Если вы получили это письмо случайно, просто проигнорируйте его!</p>
    `,
    };

    await send(transport, mailOptions);
  } catch (err) {
    throw err;
  }
}

export async function passwordRecovery(to: string, code: string): Promise<void> {
  try {
    const transport = getTransport();
    const mailOptions: MailOptionsType = {
      from: 'vladisav.serebrov@yandex.ru',
      to: to,
      subject: 'Language Card - Востановление пароля',
      html: `
      <h1>Востановление пароля</h1>
      Ваш код для сброса пароля: <b>${code}</b>
      <br>
      <p>Перейдите по ссылки ниже и введите код, чтобы сбросить ваш пароль!</p>
      <a href=http://localhost:3000/reset-password/>Сменить пароль!</a>
      <br>
    `,
    };

    await send(transport, mailOptions);
  } catch (err) {
    throw err;
  }
}
