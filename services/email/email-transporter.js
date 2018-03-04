const nodemailer = require('nodemailer');


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
    })

    return this.readyPromise
  }
}

//Singleton
module.exports = new EmailTransporter()