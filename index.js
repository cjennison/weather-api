const restify = require('restify');
const restifyPlugins = require('restify-plugins');

const server = restify.createServer();
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    return next();
  }
);

require('./routes')(server)

const db = require('./db/models')
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    server.listen(7667, function () {
      console.log('ready on %s', server.url);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

