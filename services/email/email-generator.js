const nodemailer = require('nodemailer');
const emailTransporter = require('./email-transporter')
const emailRecordCreator = require('../model-creators/email-record')

class EmailGenerator {
  constructor (subscriber) {
    this.subscriber = subscriber

    this.fromAlias = "Chris Jennison"
    this.fromAddress = 'cjennison92@gmail.com';
    this.emailType = 0
  }

  fromAddressString () {
    return `"${this.fromAlias}" <${this.fromAddress}>`
  }

  subject() {
    return 'Hello, world!';
  }

  //Override
  htmlBody() {
    return new Promise((resolve, reject) => {
      resolve('<div>Hello, world!</div>')
    })
  }

  recipient() {
    return 'cjennison92@gmail.com';
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

  sendMail(transporter, options) {
    console.log("Sending Mail w/ Options", options)
    transporter.sendMail(options, (error, info) => {
      if (error) {
        return console.log(error);
      }

      this.createRecord(options)
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }

  execute() {
    emailTransporter.readyPromise.then((transporter) => {
      this.htmlBody().then((html) => {
        this.sendMail(transporter, this.mailOptions(
          this.recipient(), 
          this.subject(), 
          html
        ))
      })
    })
    .catch((err) => {
      console.log("Error sending email", err)
    })
  }

  createRecord (options) {
    const creator = new emailRecordCreator({
      emailType: this.emailType,
      toAddress: options.to,
      fromAddress: this.fromAddress,
      subject: options.subject,
      html: options.html
    }, this.subscriber)

    creator.create()
  }
}

module.exports = EmailGenerator