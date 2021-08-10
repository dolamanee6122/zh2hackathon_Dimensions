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
router.post("/", async (req, res) => {
  const { shopID, buyerID, amount, recordType, paymentMode } = req.body;

  Buyer.findById(buyerID, async (err, buyer) => {
    if (err) return res.json({ status: "failed" });
    const { firstName, lastName, rating, address } = buyer.user;
    Shop.findById(shopID, async (err, shop) => {
      if (err) return res.json({ error: err });
      const { shopName } = shop;
      const buyerName = firstName + " " + lastName;
      let balanceShopWise = shop.balanceUserWise.find(
        (e) => JSON.stringify(e.buyerID) === JSON.stringify(buyerID)
      );

      // TODO Add connection explicity if no connection
      if (!balanceShopWise) {
        addShopToBuyer(shop, buyer);
        addBuyerToShop(shop, buyer);
        await shop.save();
        await buyer.save();
        balanceShopWise = {
          shopID: shop._id,
          shopName: shop.shopName,
          balance: getInitialBalance(),
        };
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
      //console.log(`request`, request);
      //res.json({ status: "OK", request });
      try {
        await request.save();
        res.json({ status: "OK", request });
      } catch (err) {
        console.log(`err`, err);
      }
    });
  });
});

router.post("/reject", async (req, res) => {
  const { requestID, remarks } = req.body;

  Request.findById(requestID, async (err, request) => {
    if (err) return res.json({ status: "failed" });

    request.status = "REJECTED";
    if (remarks) request.remarks = remarks;
    try {
      await request.save();
      res.json({ status: "OK", request });
    } catch (err) {
      console.log(`err`, err);
    }
  });
});

module.exports = router;
