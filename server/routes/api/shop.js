const express = require("express");
const router = express.Router();
const Shop = require("../../models/Shop");

router.post("/", async (req, res) => {
  console.log(req.body);
  const { shopName, merchantID, address, rating } = req.body;
  try {
    const shop = new Shop({
      shopName,
      merchantID,
      address,
      rating,
    });
    await shop.save();
    res.json({ message: "Shop Added" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
