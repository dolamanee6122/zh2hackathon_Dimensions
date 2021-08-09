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
  Merchant.findById(merchantID, async (err, merchant) => {
    if (err) return console.log(`err`, err);
    try {
      const shop = new Shop({
        shopName,
        merchantID,
        address,
        rating,
        balance: getInitialBalance(),
      });
      await shop.save();
      merchant.shopIDList.push(shop._id);
      await merchant.save();
      res.json({ message: "Shop Added", shop });
    } catch (err) {
      console.log(err);
    }
  });
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

// @route   GET /api/shop/{shopID}
// @desc    get information of a particular shop
// @access  Protected
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  Shop.findById(id, (err, shop) => {
    if (err) return console.log(`err`, err);
    res.json({ message: "OK", shop });
  });
});

router.post("/addRequest", async (req, res) => {});
module.exports = router;
