const validateType = function(data, category) {
  return Object.prototype.toString.call(data) === category;
};
module.exports = {
  isArray(data) {
    return validateType(data, "[object Array]");
  }
};
