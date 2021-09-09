const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // const authHeader = req.get("Authorization");
  const authHeader = req.headers.token;
  try {
    if (!authHeader) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    decodedToken = jwt.verify(token, "somesupersecretsecret");
    if (!decodedToken) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    const user = {
      id: decodedToken.id,
      isAdmin: decodedToken.isAdmin,
    };
    req.user = user;

    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

/*Buraya bak*/
