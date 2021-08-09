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

router.post("/", async (req, res) => {
  const { shopID, buyerID, amount, recordType, paymentMode } = req.body;

  Buyer.findById(buyerID, async (err, buyer) => {
    if (err) return res.json({ status: "failed" });
    const { firstName, lastName, rating, address } = buyer.user;
    Shop.findById(shopID, async (err, shop) => {
      if (err) return res.json({ error: err });
      const { shopName } = shop;
      const buyerName = firstName + " " + lastName;
      const balanceShopWise = shop.balanceUserWise.find(
        (e) => JSON.stringify(e.buyerID) === JSON.stringify(buyerID)
      );
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

module.exports = router;
