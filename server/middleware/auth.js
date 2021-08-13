const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  //TODO remove this
  return next();
  const token = req.header("x-auth-token");

  //Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //add user from payload
    console.log(`decoded`, decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
