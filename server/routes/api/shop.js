const express = require("express");
const router = express.Router();
const request = require("request");
const Shop = require("../../models/Shop");
const auth = require("../../middleware/auth");
const {
  FUSION_BASE_URL,
  IFI_ID,
  BUNDLE_ID,
  X_ZETA_AUTH_TOKEN,
} = require("config");
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
    //TODO Issue a bundle
    const { fusionID, firstName } = merchant.user;
    //console.log(`merchant`, merchant);
    const requestOptions = {
      url:
        FUSION_BASE_URL +
        "/ifi/" +
        IFI_ID +
        "/bundles/" +
        BUNDLE_ID +
        "/issueBundle",
      method: "POST",
      json: true,
      headers: {
        "Content-Type": "application/json",
        "X-Zeta-AuthToken": X_ZETA_AUTH_TOKEN,
      },
      body: {
        accountHolderID: fusionID,
        name: firstName + "_Bundle",
      },
    };
    console.log(`requestOptions`, requestOptions);
    request(requestOptions, async (err, response, body) => {
      if (err) throw err;
      const { statusCode } = response;
      //console.log(`body`, body);
      if (statusCode == 200) {
        const { accountID } = body.accounts[0];
        const shop = new Shop({
          shopName,
          merchantID,
          merchantName: merchant.user.firstName,
          accountID,
          address,
          rating,
          balance: getInitialBalance(),
        });
        merchant.shopList.push({ shopID: shop._id, shopName: shop.shopName });
        await shop.save();
        await merchant.save();
        res.json({ shopID: shop._id, ...body });
      } else {
        return res.status(statusCode).json({ ...body });
      }
    });
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
    const shops = await Shop.find();
    if (!shops) return res.status(404).json({ message: "Invalid ShopID" });
    res.json({ message: "OK", shops });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

module.exports = router;
