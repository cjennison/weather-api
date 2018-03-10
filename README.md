
# Setup
1. Install node. (https://nodejs.org/en/)
2. Create a database for the application (ie. `weather_db`)
3. Run `npm install`
4. Run `cp config/database-default.json config/database.json` and fill out 
5. Run `cp .env-default .env` and fill out gmail application credentials
database credentials.
5. Run `npm start` to start the web server.
6. Run `node_modules/.bin/sequelize db:migrate`

# Test
Go to `localhost:7667/email-tester` to execute the one time email sending system.

# SMTP
If you do not want to send emails from your email address or through Gmail you can opt into using etheral instead.
In `.env` set `TRANSPORT_METHOD` to `etheral`. When emails are sent use the `preview_url` output to view the email.

If you wish to send email through Gmail, create an application here: https://console.developers.google.com
Create OAuth2 Credentials.

Then go to https://developers.google.com/oauthplayground, input your credentials in the Cog in the upper right hand corner of the screen.

Authorize yourself with mail.google.com

With your client ID, client secret, access token and refresh token, input details in the .env file and set the transport method to `gmail`