const nodemailer = require('nodemailer');
const emailTransporter = require('./email-transporter')
const emailRecordCreator = require('../model-creators/email-record')

class EmailGenerator {
  constructor () {
    this.fromAlias = "Chris Jennison"
    this.fromAddress = 'cjennison92@gmail.com';

    this.emailType = 0
  }

  fromAddressString () {
    return `"${this.fromAlias}" <${this.fromAddress}>`
  }

  subject() {
    return new Promise((resolve, reject) => {
      resolve('Hello, world!')
    })
  }

  //Override
  htmlBody() {
    return new Promise((resolve, reject) => {
      resolve('<div>Hello, world!</div>')
    })
  }

  recipient() {
    return 'cjennison92@gmail.com'
  }

  //Override
  mailOptions(recipient, subject, htmlBody) {
    return {
      from: this.fromAddressString(),
      to: recipient,
      subject: subject,
      html: htmlBody
    };
  }

  sendMail(transporter, subscriber, options) {
    console.log("Sending Mail w/ Options", options)
    transporter.sendMail(options, (error, info) => {
      if (error) {
        return console.log(error);
      }

      this.createRecord(subscriber, options)
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }

  execute(subscribers) {
    emailTransporter.readyPromise.then((transporter) => {
      for(const subscriber of subscribers) {
        Promise.all([this.subject(subscriber), this.htmlBody(subscriber)])
          .then((values) => {
            this.sendMail(transporter, subscriber, this.mailOptions(
              this.recipient(subscriber), 
              values[0], 
              values[1]
            ))
          })
          .catch((error) => {
            console.log("Failed to send email", error)
          })
      } 
    })
  }

  createRecord (subscriber, options) {
    const creator = new emailRecordCreator({
      emailType: this.emailType,
      toAddress: options.to,
      fromAddress: this.fromAddress,
      subject: options.subject,
      html: options.html
    }, subscriber)

    creator.create()
  }
}

module.exports = EmailGenerator