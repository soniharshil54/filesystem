"use strict";
/**
 * 404 (Not Found) Response
 *
 * The requested resource could not be found but may be available again in the future.
 * Subsequent requests by the client are permissible.
 * Used when the requested resource is not found, whether it doesn't exist.
 */

const _ = require('lodash');

module.exports = function (data, config) {
  let language = this.req.headers.language;
  let message = _.get(config, 'message', `The requested resource could not be found
     but may be available again in the future`);
  const response = _.assign({
    code: _.get(config, 'code', 'E_NOT_FOUND'),
    message: message,
    data: data || {}
  }, _.get(config, 'root', {}));

  this.status(404);
  this.json(response);
};
