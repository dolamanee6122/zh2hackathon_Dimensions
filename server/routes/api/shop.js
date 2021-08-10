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

// @route   POST /api/shop/
// @desc    Add a new shop under a merchant
// @access  Protected
router.post("/", async (req, res) => {
  const { shopName, merchantID, address, rating } = req.body;
  try {
    const merchant = await Merchant.findById(merchantID);
    if (!merchant) return res.status(404).json({ message: "Invalid merchant" });
    const shop = new Shop({
      shopName,
      merchantID,
      address,
      rating,
      balance: getInitialBalance(),
    });
    merchant.shopList.push({ shopID: shop._id, shopName: shop.shopName });
    await shop.save();
    await merchant.save();
    res.json({ message: "Shop Added", shop, merchant });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// @route   GET /api/shop/{shopID}
// @desc    get information of a particular shop
// @access  Protected
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const shop = Shop.findById(id);
    if (!shop) return res.status(404).json({ message: "Invalid ShopID" });
    res.json({ message: "OK", shop });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

//TODO
router.post("/addRequest", async (req, res) => {});
module.exports = router;
