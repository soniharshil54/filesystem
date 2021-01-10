"use strict";
/**
 * 200 (OK) Response
 *
 * General status code. Most common code used to indicate success.
 * The actual response will depend on the request method used.
 * In a GET request, the response will contain an entity corresponding to the requested resource.
 * In a POST request the response will contain an entity describing or containing the result of the action.
 */

const _ = require('lodash');

module.exports = function (data, config) {
  
  let message = _.get(config, 'message', 'Operation is successfully executed');
  const response = _.assign({
    code: _.get(config, 'code', 'OK'),
    message: message,
    data: data || {}
  }, _.get(config, 'root', {}));

  this.status(200);
  this.json(response);
};
