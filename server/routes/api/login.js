const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  //sample user
  const user = {
    id: 1,
    username: "net nhi aata",
    email: "netnhiaata@email.com",
  };

  jwt.sign({ user }, "secretkeykisikonhibtaneka", (err, token) => {
    res.json({
      token,
    });
  });
});

router.post("/ppp", verifyToken,(req, res) => {
  res.json({ id: "123" });
});
// FORMAT OF TOKEN
// Authorization: Bearer <access-token>

// Verify Token
function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];
  //check if bearer is undefined
  if (bearerHeader === undefined) {
    //Forbidden
    res.sendStatus(403);
  } else {
  }
}

module.exports = router;
