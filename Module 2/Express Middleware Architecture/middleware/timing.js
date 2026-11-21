/**
 * timing middleware  [mount GLOBALLY in app.js]
 *
 * Measures the time from when the request enters this middleware until the
 * response finishes, then logs the elapsed milliseconds.
 */

module.exports = function timing(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const elapsed = Date.now() - start;
    const idPrefix = req.id ? `[${req.id.substring(0, 8)}] ` : '';
    console.log(`${idPrefix}${req.method} ${req.path} took ${elapsed}ms`);
  });

  next();
};
