/**
 * requestId middleware  [mount GLOBALLY in app.js]
 *
 * Generates a UUID for each request, makes it available to later middleware,
 * and returns it to the client in the X-Request-Id response header.
 */

const { randomUUID } = require('crypto');

module.exports = function requestId(req, res, next) {
  req.id = randomUUID();
  res.setHeader('X-Request-Id', req.id);
  next();
};
