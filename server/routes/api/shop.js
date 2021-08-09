const express = require("express");
const router = express.Router();
const Shop = require("../../models/Shop");

const getInitialBalance = () => {
  return {
    balance: 0,
    credit: 0,
    debit: 0,
  };
};

router.post("/", async (req, res) => {
  const { shopName, merchantID, address, rating } = req.body;
  try {
    const shop = new Shop({
      shopName,
      merchantID,
      address,
      rating,
      balance: getInitialBalance(),
    });
    await shop.save();
    res.json({ message: "Shop Added", shop });
  } catch (err) {
    console.log(err);
  }
});

// @route   POST /api/shop/addBuyer
// @desc    Add a new buyer for shop
// @access  Protected
router.post("/addBuyer", async (req, res) => {
  const { shopID, buyerID, buyerName } = req.body;
  Shop.findById(shopID, async (err, shop) => {
    if (err) return console.log(`err`, err);

    //TODO check if the user is already present in the shop
    shop.balanceUserWise.push({
      buyerID,
      buyerName,
      balance: getInitialBalance(),
    });
    await shop.save();
    res.json({ message: "buyer added in the shop", shop });
  });
});

router.post("/addRequest", async (req, res) => {});
module.exports = router;
