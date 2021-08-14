const express = require("express");
const router = express.Router();
const Shop = require("../../models/Shop");
const auth = require("../../middleware/auth");
const getInitialBalance = () => {
  return {
    balance: 0,
    credit: 0,
    debit: 0,
  };
};

// @route   POST /api/shop/
// @desc    Add a new shop under a merchant
// @access  Protected
router.post("/", auth, async (req, res) => {
  const { shopName, merchantID, address, rating } = req.body;
  //TODO validate shop details first
  try {
    const merchant = await Merchant.findById(merchantID);
    if (!merchant) return res.status(404).json({ message: "Invalid merchant" });
    const shop = new Shop({
      shopName,
      merchantID,
      merchantName: merchant.user.firstName + " " + merchant.user.lastName,
      address,
      rating,
      balance: getInitialBalance(),
    });
    merchant.shopList.push({ shopID: shop._id, shopName: shop.shopName });
    await shop.save();
    await merchant.save();
    res.json({ message: "Shop Added", shop });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// @route   GET /api/shop/{shopID}
// @desc    Get information of a particular shop
// @access  Protected
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const shop = await Shop.findById(id);
    if (!shop) return res.status(404).json({ message: "Invalid ShopID" });
    res.json({ message: "OK", shop });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// @route   GET /api/shop/
// @desc    Get names of all shop
// @access  Protected
router.get("/", auth, async (req, res) => {
  try {
    const shops = await Shop.find({}, { shopName: 1 });
    if (!shops) return res.status(404).json({ message: "Invalid ShopID" });
    res.json({ message: "OK", shops });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

module.exports = router;
