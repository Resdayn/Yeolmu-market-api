// Contains the validations schemas of joi

const Joi = require("@hapi/joi");

// Register validation
const registerValidation = (bodyRequest) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required().max(30),
    email: Joi.string().min(6).required().max(100).email(),
    password: Joi.string().min(6).required().max(1024),
    image: Joi.string(),
  });
  return schema.validate(bodyRequest);
};

// Login validation
const loginValidation = (bodyRequest) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().max(100).email(),
    password: Joi.string().min(6).required().max(1024),
  });
  return schema.validate(bodyRequest);
};

// Item Upload Validation
const itemUploadValidation = (bodyRequest) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required().max(30),
    title: Joi.string().required().min(1),
    price: Joi.number().required(),
    photo: Joi.string().required(),
    details: Joi.string().required().min(1).max(600)
  });
  return schema.validate(bodyRequest);
};

module.exports = {
  registerValidation,
  loginValidation,
  itemUploadValidation
};
