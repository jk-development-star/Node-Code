const User = require("../models").User;
const bcryptjs = require("bcryptjs");
const Validator = require("fastest-validator");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const sendMail = require("../config/mail");
var crypto = require("crypto");
const Leads = require("../models").Leads;

//For signup or add new user//

function addData(req, res) {
  try {
    const v = new Validator({
      useNewCustomCheckerFunction: true,
      messages: {
        atLeastOneLetter:
          "The pass value must contain at least one letter from a-z and A-Z ranges!",
        atLeastOneDigit:
          "The pass value must contain at least one digit from 0 to 9!",
      },
    });
    const schema = {
      first_name: { type: "string", optional: false, min: 3, max: 30 },
      last_name: { type: "string", optional: false, min: 3, max: 30 },
      email: { type: "email", optional: false },
      phone: { type: "string", optional: false, max: 10 },
      role: { type: "string", optional: false },
      password: {
        type: "string",
        custom: (v, errors) => {
          if (!/[0-9]/.test(v)) errors.push({ type: "atLeastOneDigit" });
          if (!/[a-zA-Z]/.test(v)) errors.push({ type: "atLeastOneLetter" });
          return v;
        },
        min: 8,
        max: 20,
        messages: {
          stringPattern: "password value must contain a digit",
          stringMin: "Your password value is too short",
          stringMax: "Your password value is too large",
        },
      },
      password_confirmation: { type: "string", optional: false },
    };
    const validationResponse = v.validate(req.body, schema);
    User.findOne({ where: { email: req.body.email } })
      .then((result) => {
        if (result) {
          return res.status(409).json({
            message: "Email already exists",
          });
        } else {
          if (req.body.password === req.body.password_confirmation) {
            bcryptjs.genSalt(10, function (err, salt) {
              bcryptjs.hash(req.body.password, salt, function (err, hash) {
                const post = {
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  email: req.body.email,
                  phone: req.body.phone,
                  password: hash,
                  role: req.body.role,
                  password_confirmation: req.body.password_confirmation,
                };
                if (validationResponse !== true) {
                  return res.status(422).json({
                    messages: "Validation failed",
                    errors: validationResponse,
                  });
                } else {
                  User.create(post)
                    .then((result) => {
                      const text = `Hi ${post.first_name} ${post.last_name}, You have successfully registered with us!!
                                                Thanks!! `;
                      sendMail(req.body.email, "Verification Email", text);
                      return res.status(200).json({
                        message: "User has been created successfully",
                        result: result,
                      });
                    })
                    .catch((err) => {
                      return res.status(401).json({
                        message: "Something went wrong",
                        error: err,
                      });
                    });
                }
              });
            });
          } else {
            return res.status(300).json({
              message: "Password and Confirm Password should be same...",
            });
          }
        }
      })
      .catch((error) => {
        return res.status(400).json({
          message: "Something went wrong",
          error,
        });
      });
  } catch (err) {
    console.log(err);
  }
}

//for get all the added users//

const getAlluUers = async (req, res) => {
  User.findAll({
    include: [
      {
        model: Leads,
        as: "GeneratedBy",
      },
      {
        model: Leads,
        as: "AssignedTo",
      },
    ],
    where: { id: { [Op.ne]: req.id.user_id } },
  })
    .then((result) => {
      return res.status(200).json({
        message: "All users list fetched successfully",
        result: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Something went wrong while fetching all the users.",
      });
    });
};

//for get all the added users//

const getUsers = async (req, res) => {
  User.findAll()
    .then((result) => {
      return res.status(200).json({
        message: "All users list fetched successfully",
        result: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Something went wrong while fetching all the users.",
      });
    });
};

//for get user by id//
const getUserById = async (req, res) => {
  let id = req.params.id;
  User.findByPk(id)
    .then((result) => {
      return res.status(200).json({
        message: "User Found",
        result: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "User not found",
        result: err,
      });
    });
};

//for updated the existing user//
const updateUser = async (req, res, next) => {
  const schema = {
    first_name: { type: "string", optional: false, min: 3, max: 30 },
    last_name: { type: "string", optional: false, min: 3, max: 30 },
    email: { type: "email", optional: false },
    phone: { type: "string", optional: false, max: 10 },
    role: { type: "string", optional: false },
  };
  const v = new Validator();
  const validationResponse = v.validate(req.body, schema);
  const post = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
  };
  let id = req.params.id;
  User.findOne({
    where: { id: id },
  })
    .then((user) => {
      if (user) {
        if (validationResponse !== true) {
          return res.status(422).json({
            message: "Validation Failed!!",
            errors: validationResponse,
          });
        } else {
          user.update(post).then((result) => {
            return res.status(200).json({
              message: "User updated successfully",
              result: result,
            });
          });
        }
      } else {
        return res.status(206).json({
          message: "User not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
};

//for login the users//
function loginUser(req, res) {
  const schema = {
    email: { type: "email", optional: false },
    password: { type: "string", empty: false },
  };
  const v = new Validator();
  const credentialsResponse = v.validate(req.body, schema);
  if (credentialsResponse !== true) {
    return res.status(422).json({
      message: "Validation Failed!!",
      errors: credentialsResponse,
    });
  } else {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user || user === null) {
          return res.status(401).json({
            message: "Entered email address not found!",
          });
        } else {
          bcryptjs.compare(
            req.body.password,
            user.password,
            function (err, result) {
              if (result) {
                const token = jwt.sign(
                  {
                    email: user.email,
                    userId: user.id,
                    role: user.role,
                    expiresIn: 86400,
                  },
                  process.env.JWT_KEY,
                  function (err, token) {
                    return res.status(200).json({
                      message: "Authentication successfull!",
                      result: user,
                      token: token,
                    });
                  }
                );
              } else {
                return res.status(402).json({
                  message: "Invalid Email address or Password!",
                });
              }
            }
          );
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message:
            "Sorry! Something went wrong, Please check your database connection.",
          error: error,
        });
      });
  }
}

// delete user record from database//
const deleteUser = async (req, res) => {
  let id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((result) => {
      return res.status(200).json({
        message: "User delete successfully",
        result: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Sorry! Something went wrong, Please try again.",
        error: error,
      });
    });
};

//to change password current password after login//
function changePassword(req, res, next) {
  const schema = {
    newPassword: {
      type: "string",
      custom: (v, errors) => {
        if (!/[0-9]/.test(v)) errors.push({ type: "atLeastOneDigit" });
        if (!/[a-zA-Z]/.test(v)) errors.push({ type: "atLeastOneLetter" });
        return v;
      },
      min: 8,
      max: 20,
      messages: {
        stringPattern: "password value must contain a digit",
        stringMin: "Your password value is too short",
        stringMax: "Your password value is too large",
      },
    },
    oldPassword: {
      type: "string",
      min: 8,
      max: 20,
      optional: false,
    },
    confirmPassword: {
      type: "string",
      min: 8,
      max: 20,
      optional: false,
    },
  };
  const v = new Validator({
    useNewCustomCheckerFunction: true,
    messages: {
      atLeastOneLetter:
        "The password value must contain at least one letter from a-z and A-Z ranges!",
      atLeastOneDigit:
        "The password value must contain at least one digit from 0 to 9!",
    },
  });
  const validateSchema = v.validate(req.body, schema);
  if (validateSchema !== true) {
    return res.status(422).json({
      message: "Validation Failed!!",
      errors: validateSchema,
    });
  } else {
    User.findOne({ where: { id: req.auth.userId } })
      .then((user) => {
        if (!user || user === null) {
          return res.status(401).json({
            message: "User not found, Please try again!",
          });
        } else {
          bcryptjs.compare(
            req.body.oldPassword,
            user.password,
            function (err, result) {
              if (result) {
                if (req.body.confirmPassword === req.body.newPassword) {
                  bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(
                      req.body.newPassword,
                      salt,
                      function (err, hash) {
                        const post = {
                          password: hash,
                        };
                        user.update(post).then((result) => {
                          return res.status(200).json({
                            message: "User password successfully",
                            result: result,
                          });
                        });
                      }
                    );
                  });
                } else {
                  return res.status(300).json({
                    message:
                      "New Password and Confirm Password should be same...",
                  });
                }
              } else {
                return res.status(401).json({
                  message:
                    "Empty or Invalid old password, Please enter right one!",
                });
              }
            }
          );
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Sorry! Something went wrong, Please try again.",
          error: error,
        });
      });
  }
}

// for get the reset password email on entered email address//
function forgotPasswordEmail(req, res) {
  const schema = {
    email: { type: "email", optional: false },
  };
  const data = {
    verificationToken: crypto.randomBytes(64).toString("hex"),
    generatedAt: new Date().toISOString(),
  };
  const v = new Validator();
  const validateSchema = v.validate(req.body, schema);
  if (validateSchema !== true) {
    return res.status(402).json({
      message: "validation Failed.",
      error: validateSchema,
    });
  } else {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user || user === null) {
          return res.status(400).json({
            message: "Entered Email not found, Please enter correct one..",
          });
        } else {
          user
            .update(data)
            .then((result) => {
              const url = `http://localhost:3000/reset-password/${user.id}/${data.verificationToken}`;
              const text = `Hi ${user.first_name} ${user.last_name}, Please visit the below Forgot Password link to reset your password!! 
                         ${url}`;

              sendMail(req.body.email, "Verification Email", text);
              return res.status(200).json({
                message:
                  "Email has been sent on entered email address, please reset your password.",
                result: result,
              });
            })
            .catch((error) => {
              return res.status(500).json({
                message: "Sorry! Something went wrong, Please try again.",
                error: error,
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Sorry! Something went wrong, Please try again.",
          error: error,
        });
      });
  }
}

// to reset the password and check the token expiration//
const resetPassword = async (req, res) => {
  const schema = {
    password: {
      type: "string",
      custom: (v, errors) => {
        if (!/[0-9]/.test(v)) errors.push({ type: "atLeastOneDigit" });
        if (!/[a-zA-Z]/.test(v)) errors.push({ type: "atLeastOneLetter" });
        return v;
      },
      min: 8,
      max: 20,
      messages: {
        stringPattern: "password value must contain a digit",
        stringMin: "Your password value is too short",
        stringMax: "Your password value is too large",
      },
    },
    confirm_password: {
      type: "string",
      min: 8,
      max: 20,
      optional: false,
    },
  };
  let token = req.params.token;
  User.findOne({ where: { verificationToken: token } })
    .then((user) => {
      if (!user || user === null) {
        return res.status(400).json({
          message: "Entered Email not found, Please enter correct one..",
        });
      } else {
        let generatedTime = new Date(user.generatedAt).getTime();
        let expireTime = new Date(generatedTime + 5 * 60000).toString();
        if (Date.parse(new Date()) > Date.parse(new Date(expireTime))) {
          user.update({ verificationToken: null }).then(() => {
            return res.status(201).json({
              message: "Link has been expired, Please generate new one..",
            });
          });
        } else {
          const v = new Validator({
            useNewCustomCheckerFunction: true,
            messages: {
              atLeastOneLetter:
                "The password value must contain at least one letter from a-z and A-Z ranges!",
              atLeastOneDigit:
                "The password value must contain at least one digit from 0 to 9!",
            },
          });
          const validateSchema = v.validate(req.body, schema);
          if (validateSchema !== true) {
            return res.status(422).json({
              message: "Validation Failed!!",
              errors: validateSchema,
            });
          } else {
            if (req.body.password === req.body.confirm_password) {
              bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(req.body.password, salt, function (err, hash) {
                  const post = {
                    password: hash,
                  };
                  user
                    .update(post)
                    .then((result) => {
                      return res.status(200).json({
                        message:
                          "Password reset successfully, Please go to the login page..",
                        result: result,
                      });
                    })
                    .catch((error) => {
                      return res.status(501).json({
                        message:
                          "Password can not be reset, Please try again..",
                        error: error,
                      });
                    });
                });
              });
            } else {
              return res.status(300).json({
                message: "Password and Confirm Password should be same...",
              });
            }
          }
        }
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Sorry! Something went wrong, Please try again.",
        error: error,
      });
    });
};

module.exports = {
  addData: addData,
  getAlluUers: getAlluUers,
  getUserById: getUserById,
  updateUser: updateUser,
  loginUser: loginUser,
  deleteUser: deleteUser,
  changePassword: changePassword,
  forgotPasswordEmail: forgotPasswordEmail,
  resetPassword: resetPassword,
  getUsers: getUsers,
};
