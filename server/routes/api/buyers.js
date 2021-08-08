const express = require("express");
const router = express.Router();

//Buyers model
//const Buyer = require("../../models/Buyer");
const merchants = [
  { id: 1, name: "buyer1" },
  { id: 2, name: "buyer2" },
  { id: 3, name: "buyer3" },
  { id: 4, name: "buyer4" },
];

router.get("/", (req, res) => {
  res.send(buyers);
});

router.get("/:id", (req, res) => {
  const buyer = buyers.find((b) => b.id === parseInt(req.params.id));
  if (!buyer) {
    res.status(404).send("Given buyer ID does not exist");
  } else {
    res.send(buyer);
  }
});

// @route   POST /api/buyers
// @desc    register a new buyer
// @access  Public
router.post("/", (req, res) => {
  const buyer = {
    id: buyers.length + 1,
    name: req.body.name,
  };
  buyers.push(buyer);
  res.send(buyer);
});

module.exports = router;
