/**
 * logger middleware  [mount GLOBALLY in app.js]
 *
 * Logs the request method, path, and final response status when the response
 * finishes. The request ID prefix makes related log lines easy to trace.
 */

module.exports = function logger(req, res, next) {
  res.on('finish', () => {
    const idPrefix = req.id ? `[${req.id.substring(0, 8)}] ` : '';
    console.log(`${idPrefix}${req.method} ${req.path} ${res.statusCode}`);
  });

  next();
};
