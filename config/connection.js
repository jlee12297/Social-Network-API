const { connect, connection } = require('mongoose');

connect('mongodb://localhost/SocialNetworkAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;