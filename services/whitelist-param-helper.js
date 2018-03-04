module.exports = function (source, model) {
  const params = {};
  for (const attribute of model.allowedAttributes()) {
    if (source.hasOwnProperty(attribute)) {
      params[attribute] = source[attribute];
    }
  }

  return params;
}