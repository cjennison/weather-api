const nodemailer = require('nodemailer');
require('dotenv').load();

function etheralTransporter(resolve, reject) {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      return reject(err);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    return resolve(transporter);
  });
}

function gmailTransporter(resolve) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.MY_EMAIL,
      clientId: process.env.MY_CLIENT_ID,
      clientSecret: process.env.MY_CLIENT_SECRET,
      refreshToken: process.env.MY_REFRESH_TOKEN,
      accessToken: process.env.MY_ACCESS_TOKEN,
      expires: 1484314697598,
    },
  });

  resolve(transporter);
}

class EmailTransporter {
  constructor() {
    this.readyPromise = null;
    this.transporter = null;

    this.initTransporter()
      .then((transporter) => {
        this.transporter = transporter;
      });
  }

  initTransporter() {
    this.readyPromise = new Promise((resolve, reject) => {
      switch (process.env.TRANSPORT_METHOD) {
        case 'gmail':
          gmailTransporter(resolve, reject);
          break;
        case 'etheral':
          etheralTransporter(resolve, reject);
          break;
        default:
          reject(new Error('No transport method chosen'));
          break;
      }
    });

    return this.readyPromise;
  }
}

module.exports = new EmailTransporter();
