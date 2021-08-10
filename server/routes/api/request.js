const express = require("express");
const router = express.Router();
const Shop = require("../../models/Shop");
const Buyer = require("../../models/Buyer");
const Request = require("../../models/Request");

const getInitialBalance = () => {
  return {
    balance: 0,
    credit: 0,
    debit: 0,
  };
};

// adding balanceUserWise inside Shop
const addShopToBuyer = (shop, buyer) => {
  shop.balanceUserWise.push({
    buyerID: buyer._id,
    buyerName: buyer.user.firstName + " " + buyer.user.lastName,
    balance: getInitialBalance(),
  });
};

// adding balanceShopWise inside Buyer
const addBuyerToShop = (shop, buyer) => {
  buyer.balanceShopWise.push({
    shopID: shop._id,
    shopName: shop.shopName,
    balance: getInitialBalance(),
  });
};

// @route   POST /api/request/
// @desc    create a request for doing a transaction
// @access  Protected
router.post("/", async (req, res) => {
  const { shopID, buyerID, amount, recordType, paymentMode } = req.body;

  try {
    const buyer = await Buyer.findById(buyerID);
    const shop = await Shop.findById(shopID);
    if (!buyer || !shop)
      return res.status(404).json({ message: "Invalid request" });
    const { firstName, lastName, rating, address } = buyer.user;
    const { shopName } = shop;
    const buyerName = firstName + " " + lastName;
    let balanceShopWise = shop.balanceUserWise.find(
      (e) => JSON.stringify(e.buyerID) === JSON.stringify(buyerID)
    );

    // TODO Add connection explicity if no connection
    if (!balanceShopWise) {
      addShopToBuyer(shop, buyer);
      addBuyerToShop(shop, buyer);
      balanceShopWise = {
        shopID: shop._id,
        shopName: shop.shopName,
        balance: getInitialBalance(),
      };
      await shop.save();
      await buyer.save();
    }

    const request = new Request({
      buyer: {
        buyerID,
        buyerName,
        rating,
        address,
      },
      shop: {
        shopID,
        shopName,
      },
      status: "PENDING",
      amount,
      recordType,
      paymentMode,
      balanceShopWise: balanceShopWise.balance,
    });

    await request.save();
    res.json({ status: "OK", request });
  } catch (err) {
    console.log(`err`, err);
    return res.status(500).json({ err });
  }
});

// @route   POST /api/request/reject
// @desc    Rejecting a pending transaction request
// @access  Protected
router.post("/reject", async (req, res) => {
  const { requestID, remarks } = req.body;
  try {
    const request = await Request.findById(requestID);
    if (!request) return res.status(404).json({ message: "Invalid requestID" });
    if (request.status !== "PENDING")
      return res.json({ message: "Not a pending request" });
    request.status = "REJECTED";
    if (remarks) request.remarks = remarks;
    else request.remarks = "None";

    await request.save();
    res.json({ status: "OK", request });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

module.exports = router;
