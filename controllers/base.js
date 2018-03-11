const whiteListedParams = require('../services/whitelist-param-helper');

class BaseController {
  whiteListedParams(params, model) {
    return whiteListedParams(params, model);
  }
}

module.exports = BaseController;
