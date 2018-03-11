const nodemailer = require('nodemailer');
const emailTransporter = require('./email-transporter');
const EmailRecordCreator = require('../model-creators/email-record');

require('dotenv').load();

class EmailGenerator {
  constructor(subscriber) {
    this.subscriber = subscriber;

    this.fromAlias = '';
    this.fromAddress = process.env.MY_EMAIL;
    this.emailType = 0;
  }

  fromAddressString() {
    return `"${this.fromAlias}" <${this.fromAddress}>`;
  }

  subject() {
    return 'Hello, world!';
  }

  htmlBody() {
    return new Promise((resolve, reject) => {
      try {
        resolve('<div>Hello, world!</div>');
      } catch (e) {
        reject(e);
      }
    });
  }

  recipient() {
    return '';
  }

  mailOptions(recipient, subject, htmlBody) {
    return {
      from: this.fromAddressString(),
      to: recipient,
      subject,
      html: htmlBody,
    };
  }

  sendMail(transporter, options) {
    console.log('Sending Mail w/ Options', options);
    transporter.sendMail(options, (error, info) => {
      if (error) {
        return console.log(error);
      }

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return this.createRecord(options);
    });
  }

  execute() {
    emailTransporter.readyPromise.then((transporter) => {
      this.htmlBody().then((html) => {
        this.sendMail(transporter, this.mailOptions(
          this.recipient(),
          this.subject(),
          html
        ));
      }).catch((err) => {
        console.log('Error sending email', err);
      });
    }).catch((err) => {
      console.log('Error sending email', err);
    });
  }

  createRecord(options) {
    const creator = new EmailRecordCreator({
      emailType: this.emailType,
      toAddress: options.to,
      fromAddress: this.fromAddress,
      subject: options.subject,
      html: options.html,
    }, this.subscriber);

    creator.create();
  }
}

module.exports = EmailGenerator;
