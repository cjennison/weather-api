const nodemailer = require('nodemailer');
require('dotenv').load();

class EmailTransporter {
  constructor() {
    this.readyPromise = null
    this.transporter = null

    this.initTransporter()
      .then((transporter) => {
        this.transporter = transporter
      })
  }

  initTransporter() {
    this.readyPromise = new Promise((resolve, reject) => {
      gmailTransporter(resolve, reject)
    })

    return this.readyPromise
  }
}

function etheralTransporter(resolve, reject) {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      return reject(err)
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    resolve(transporter)
  });
}

function gmailTransporter(resolve, reject) {
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
        expires: 1484314697598
    }
 });

 resolve(transporter)
}

//Singleton
module.exports = new EmailTransporter()