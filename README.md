
# Setup
1. Install node. (https://nodejs.org/en/)
2. Create a database for the application (ie. `weather_db`)
3. Run `npm install`
4. Run `cp config/database-default.json config/database.json` and fill out database credentials.
5. Run `npm start` to start the web server.
6. Run `node_modules/.bin/sequelize db:migrate`