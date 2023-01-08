const express = require("express");
const router = express.Router();
const {
  addData,
  getAlluUers,
  getUserById,
  updateUser,
  loginUser,
  deleteUser,
  changePassword,
  forgotPasswordEmail,
  resetPassword,
  getUsers,
} = require("../controllers/users.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

/**
 * @openapi
 * "/login": {
 *      "post": {
            "tags": ["User CRUD operations"],
            "description": "Login the user in the app",
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": object,
                                "properties": {
                                    "email": { 
                                        "description": "Email of the user",
                                        "type": "string"
                                    },
                                    "password": {
                                        "description": "Password of the user",
                                        "type": "string"
                                    }
                                },
                            "required": ["email", "password"] 
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Returns a mysterious number",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                    "type": "string",
                                    "description": "The 'email' field must be a valid e-mail."
                                    },
                                    "result":{
                                        "id":{
                                        "type": integer,
                                        "description": "Unique ID of the user",
                                        },
                                        "first_name":{
                                            "type": "string",
                                            "description": "The user's first name."
                                        },
                                        "last_name":{
                                            "type": "string",
                                            "description": "The user's last name."
                                        },
                                        "email":{
                                            "type": "string",
                                            "description": "The user's email."
                                        },
                                        "phone":{
                                            "type": "string",
                                            "description": "The user's phone number."
                                        },
                                        "role":{
                                            "type": "string",
                                            "description": "The user's first role."
                                        }
                                    }  
                                },
                           }
                       }
                   }
               },
               "422": {
                    "description": "Validation Failed!",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "The 'email' field must be a valid e-mail."
                                    },
                                    "errors": [{
                                        "type": "string",
                                        "message": "The 'password' field must not be empty.",
                                        "field": "password",
                                        "actual": ""
                                    }],  
                                },
                           }
                       }
                   }
               },
               "401": {
                    "description": "Email address not found",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "email address not found",
                                    }
                                },
                           }
                       }
                   }
               },
               "402": {
                    "description": "Returns a mysterious number",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "email address not found",
                                    }
                                },
                           }
                       }
                   }
               },
               "500": {
                    "description": "Sorry! Something went wrong, Please check your database connection..",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "email address not found",
                                    }
                                },
                           }
                       }
                   }
               },
           }
       }
   }
 */
router.post("/login", loginUser);

/**
 * @openapi
 * "/": {
 *      "get": {
            "tags": ["User CRUD operations"],
            "description": "To get all teh users list",
            "responses": {
                "200": {
                    "description": "All users list fetched successfully",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "User added successfully"
                                    },
                                    "result":[{
                                        "id":{
                                        "type": integer,
                                        "description": "Unique ID of the user",
                                        },
                                        "first_name":{
                                            "type": "string",
                                            "description": "The user's first name."
                                        },
                                        "last_name":{
                                            "type": "string",
                                            "description": "The user's last name."
                                        },
                                        "email":{
                                            "type": "string",
                                            "description": "The user's email."
                                        },
                                        "phone":{
                                            "type": "string",
                                            "description": "The user's phone number."
                                        },
                                        "role":{
                                            "type": "string",
                                            "description": "The user's first role."
                                        }
                                    }]  
                                },
                           }
                       }
                   }
               },
               "400": {
                    "description": "Something went wrong while fetching all the users.",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "Something went wrong while fetching all the users.",
                                    }
                                },
                           }
                       }
                   }
               },
           }
       }
   }
 */
router.get("/", checkAuthMiddleware.checkAuth, getAlluUers);

/**
 * @openapi
 * "/addUser": {
 *      "post": {
            "tags": ["User CRUD operations"],
            "description": "Add new user to application",
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": object,
                                "properties": {
                                    "first_name": { 
                                        "description": "first name of the user",
                                        "type": "string"
                                    },
                                    "last_name": { 
                                        "description": "last name of the user",
                                        "type": "string"
                                    },
                                    "email": { 
                                        "description": "Email of the user",
                                        "type": "string"
                                    },
                                    "phone": { 
                                        "description": "Phone number of the user",
                                        "type": "string"
                                    },
                                    "role": { 
                                        "description": "Role of the user",
                                        "type": "string"
                                    },
                                    "password": {
                                        "description": "Password of the user",
                                        "type": "string"
                                    },
                                    "password_confirmation": {
                                        "description": "Confirm Password of the user",
                                        "type": "string"
                                    }
                                },
                            "required": ["first_name", "last_name", "phone", "email", "password", "role", "password_confirmation"] 
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User has been created successfully",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "User added successfully"
                                    },
                                    "result":{
                                        "id":{
                                        "type": integer,
                                        "description": "Unique ID of the user",
                                        },
                                        "first_name":{
                                            "type": "string",
                                            "description": "The user's first name."
                                        },
                                        "last_name":{
                                            "type": "string",
                                            "description": "The user's last name."
                                        },
                                        "email":{
                                            "type": "string",
                                            "description": "The user's email."
                                        },
                                        "phone":{
                                            "type": "string",
                                            "description": "The user's phone number."
                                        },
                                        "role":{
                                            "type": "string",
                                            "description": "The user's first role."
                                        }
                                    }  
                                },
                           }
                       }
                   }
               },
               "422": {
                    "description": "Validation Failed!",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "Validation Failed!"
                                    },
                                    "errors": [{
                                        "type": "string",
                                        "message": "The  field must not be empty.",
                                        "field": "password",
                                        "actual": ""
                                    }],  
                                },
                           }
                       }
                   }
               },
               "409": {
                    "description": "Email address already exists",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "Please use another password",
                                    }
                                },
                           }
                       }
                   }
               },
               "400": {
                    "description": "Something went wrong",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "Something went wrong",
                                    }
                                },
                           }
                       }
                   }
               },
               "300": {
                    "description": "Password and Confirm Password should be same...",
                    "content": {
                        "application/json": {
                           "schema":{
                            "type": object,
                                "properties":{
                                    "message":{
                                        "type": "string",
                                        "description": "Password and Confirm Password should be same...",
                                    }
                                },
                           }
                       }
                   }
               },
           }
       }
   }
 */
router.all("/getUsers", checkAuthMiddleware.checkAuth, getUsers);
router.post("/addUser", checkAuthMiddleware.checkAuth, addData);
router.all("/:id", checkAuthMiddleware.checkAuth, getUserById);
router.post("/updateUser/:id", checkAuthMiddleware.checkAuth, updateUser);
router.post("/changePassword", checkAuthMiddleware.checkAuth, changePassword);

router.delete("/delete/:id", checkAuthMiddleware.checkAuth, deleteUser);
router.get("/token", checkAuthMiddleware.checkAuth, (req, res) => {
  return res.status(200).json({
    message: "You are authenticated!!",
  });
});
router.post("/forgotPasswordEmail", forgotPasswordEmail);
router.post("/reset-password/:id/:token", resetPassword);

module.exports = router;
