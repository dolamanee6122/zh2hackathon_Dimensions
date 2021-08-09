const express = require("express");
const router = express.Router();
const Transaction = require("../../models/Transaction");
const Merchant = require("../../models/Merchant");
const Shop = require("../../models/Shop");
const Buyer = require("../../models/Buyer");
//const Request = require("../../models/Buyer");

// update balance of buyer for the current transaction
const updateBalanceBuyer = (buyer, shopID, transaction, recordType, amount) => {
  const buyerID = buyer._id;
  const beforeTrxnBalance = buyer.user.balance;
  const afterTrxnBalance = beforeTrxnBalance;
  transaction.previousBalance = beforeTrxnBalance.balance;
  const { balance: beforeTrxnBalanceShopWise } = buyer.balanceShopWise.find(
    (e) => JSON.stringify(e.shopID) === JSON.stringify(shopID)
  );
  const afterTrxnBalanceShopWise = beforeTrxnBalanceShopWise;

  // LOAN from buyer's End (CREDIT)
  // aane wle paise jo udhar diye gaye hain (DEBIT for dukan)
  if (recordType == "CREDIT") {
    afterTrxnBalance.credit += amount;
    afterTrxnBalanceShopWise.credit += amount;
  } else if (recordType == "DEBIT") {
    afterTrxnBalance.debit += amount;
    afterTrxnBalanceShopWise.debit += amount;
  }
  afterTrxnBalance.balance = afterTrxnBalance.debit - afterTrxnBalance.credit;
  afterTrxnBalanceShopWise.balance =
    afterTrxnBalanceShopWise.debit - afterTrxnBalanceShopWise.credit;

  buyer.user.balance = afterTrxnBalance;
  buyer.balanceShopWise.forEach((shop) => {
    if (JSON.stringify(shop.shopID) === JSON.stringify(shopID)) {
      shop.balance = afterTrxnBalanceShopWise;
    }
  });
  transaction.newBalance = afterTrxnBalance.balance;
  console.log(`transaction`, transaction);
};

// update balance of shop for the current transaction
const updateBalanceShop = (shop, buyerID, recordType, amount) => {
  const shopID = shop._id;
  const beforeTrxnBalance = shop.balance;
  const afterTrxnBalance = beforeTrxnBalance;
  const { balance: beforeTrxnBalanceUserWise } = shop.balanceUserWise.find(
    (e) => JSON.stringify(e.buyerID) === JSON.stringify(buyerID)
  );
  const afterTrxnBalanceUserWise = beforeTrxnBalanceUserWise;
  // LOAN from buyer's End (CREDIT)
  // aane wle paise jo udhar diye gaye hain (DEBIT for dukan)
  if (recordType == "CREDIT") {
    afterTrxnBalance.debit += amount;
    afterTrxnBalanceUserWise.debit += amount;
  } else if (recordType == "DEBIT") {
    afterTrxnBalance.credit += amount;
    afterTrxnBalanceUserWise.credit += amount;
  }
  afterTrxnBalance.balance = afterTrxnBalance.debit - afterTrxnBalance.credit;
  afterTrxnBalanceUserWise.balance =
    afterTrxnBalanceUserWise.debit - afterTrxnBalanceUserWise.credit;

  shop.balance = afterTrxnBalance;
  shop.balanceUserWise.forEach((buyer) => {
    if (JSON.stringify(buyer.buyerID) === JSON.stringify(buyerID)) {
      buyer.balance = afterTrxnBalanceUserWise;
    }
  });
};

const updateBalanceMerchant = (merchant, recordType, amount) => {
  const beforeTrxnBalance = merchant.user.balance;
  const afterTrxnBalance = beforeTrxnBalance;
  if (recordType == "CREDIT") {
    afterTrxnBalance.debit += amount;
  } else if (recordType == "DEBIT") {
    afterTrxnBalance.credit += amount;
  }
  afterTrxnBalance.balance = afterTrxnBalance.debit - afterTrxnBalance.credit;
  merchant.user.balance = afterTrxnBalance;
};

const updateBalance = (
  buyer,
  shop,
  merchant,
  transaction,
  recordType,
  amount,
  currency
) => {
  //userID === buyerID
  const buyerID = buyer._id;
  const shopID = shop._id;
  //const merchantID = merchant._id;

  // before updating change the currency and amount to INR
  updateBalanceBuyer(buyer, shopID, transaction, recordType, amount);
  updateBalanceShop(shop, buyerID, recordType, amount);
  updateBalanceMerchant(merchant, recordType, amount);
};

router.post("/", async (req, res) => {
  //console.log(req.body);
  const { requestID, attributes } = req.body;

  Request.findById(requestID, (err, request) => {
    if (err) return console.log(err);
    //console.log(`request`, request);
    const {
      buyer: { buyerID },
      shop: { shopID },
      amount,
      paymentMode,
      recordType,
    } = request;
    currency = "INR";
    // const trxnRequest = {
    //   buyerID: request.buyer.buyerID,
    //   shopID: request.shop.shopID,
    //   amount: request.amount,
    //   paymentMode: request.paymentMode,
    //   recordType: request.recordType,
    //   currency: "INR",
    //   attributes,
    // };

    try {
      const transaction = new Transaction({
        buyerID,
        shopID,
        amount,
        paymentMode,
        recordType,
        currency,
        attributes,
      });

      //TODO handle case when buyerID, shopID, merchantID not found
      //TODO check if the request has been already approved or failed
      Buyer.findById(request.buyer.buyerID, async (err, buyer) => {
        if (err) return console.log(err);
        Shop.findById(request.shop.shopID, async (err, shop) => {
          if (err) return console.log(err);
          const merchantID = shop.merchantID;
          Merchant.findById(merchantID, async (err, merchant) => {
            if (err) return console.log(err);
            //console.log(merchant);

            updateBalance(
              buyer,
              shop,
              merchant,
              transaction,
              recordType,
              amount,
              currency
            );
            await buyer.save();
            await shop.save();
            await merchant.save();
            await transaction.save();

            request.status = "APPROVED";
            await request.save();
            //console.log(`request`, request);
            return res.json({
              status: "Payment Successful...",
              buyer,
              shop,
              merchant,
              transaction,
              request,
            });
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Transaction.findById(id, (err, transaction) => {
    if (err) return res.status(404).json({ error: err });
    res.json({ message: "OK", transaction });
  });
});

module.exports = router;
