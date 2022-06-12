const Joi = require("joi");

console.log(Joi);

const subscriptionValidation = Joi.object({
  title: Joi.string.required,
  description: Joi.string.required,
  price: Joi.number.required,
});

module.exports = subscriptionValidation;
