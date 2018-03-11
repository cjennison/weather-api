const _ = require('lodash');

module.exports = function (source, model) {
  const params = {};
  _.forEach(model.allowedAttributes(), (attribute) => {
    if (source[attribute]) {
      params[attribute] = source[attribute];
    }
  });

  return params;
};
