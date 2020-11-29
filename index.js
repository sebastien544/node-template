const config = require('config');
const express = require("express");
const app = express();

// if (!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined');
//   process.exit(1);
// }

require('./startup/logging');
require('./startup/db')();
require('./startup/routes')(app);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(config.get('db'))

if(app.get('env') === "production"){
  require('./startup/prod')(app);
}

const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;

