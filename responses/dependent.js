"use strict";

/**
 * 400 (Bad Request) Response
 *
 * The request cannot be fulfilled due to bad syntax.
 * General error when fulfilling the request would cause an invalid state.
 * Domain validation errors, missing data, etc.
 */

const _ = require('lodash');

module.exports = function (data, config) {
    const response = _.assign({
        code: _.get(config, 'code', 'E_DEPENDENT'),
        message: _.get(config, 'message', 'The request cannot be fulfilled due to dependencies of other module(s).'),
        data: data || {}
    }, _.get(config, 'root', {}));

    this.status(200);
    this.json(response);
};
