// Configuration file - this is a new untracked file
module.exports = {
  port: process.env.PORT || 3000,
  database: {
    host: 'localhost',
    port: 5432,
    name: 'myapp_db'
  },
  api: {
    version: 'v1',
    baseUrl: '/api'
  }
};