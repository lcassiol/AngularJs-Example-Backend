// routes/index.js
const contactRoutes = require('./contact_routes.js');
const operatorRoutes = require('./operator_routes.js');
module.exports = function(app, db) {
  contactRoutes(app, db);
  operatorRoutes(app,db);
  // Other route groups could go here, in the future
};
