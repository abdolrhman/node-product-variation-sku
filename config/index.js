const publicRoutes = require('./routes/publicRoutes');

const config = {
  migrate: false,
  publicRoutes,
  port: process.env.PORT || '8000',
};

module.exports = config;
