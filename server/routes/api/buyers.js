const express = require("express");
const router = express.Router();

//Buyers model
const Buyer = require("../../models/Buyer");

const getInitialBalance = () => {
  return {
    balance: 0,
    credit: 0,
    debit: 0,
  };
};

// @route   POST /api/buyers
// @desc    register a new buyer
// @access  Public
router.post("/", async (req, res) => {
  const { user } = req.body;
  user.balance = getInitialBalance();
  try {
    const buyer = new Buyer({ user });
    await buyer.save();
    res.json({ message: "Buyer Added", buyer });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

// @route   GET /api/buyers/{buyerID}
// @desc    get information of a particular buyer
// @access  Protected
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const buyer = await Buyer.findById(id);
    if (!buyer) return res.status(404).json({ message: "Invalid buyerID" });
    res.json({ message: "OK", buyer });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});
module.exports = router;
