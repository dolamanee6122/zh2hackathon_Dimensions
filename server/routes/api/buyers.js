const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const request = require("request");
//Buyers model
const Buyer = require("../../models/Buyer");
const bcrypt = require("bcryptjs");
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

// @route   POST /api/buyers/signin
// @desc    Login for buyer
// @access  Public
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const buyerLogin = await Buyer.findOne({ "user.email": email });
    // if (
    //   !buyerLogin ||
    //   !(await bcrypt.compare(password, buyerLogin.user.password))
    // )
    //   return res.status(404).json({ message: "Invalid credentials" });
    const token = await buyerLogin.user.generateAuthToken(buyerLogin._id);
    res.json({
      message: "Signed In successfully",
      buyerID: buyerLogin._id,
      token,
    });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// @route   POST /api/buyers
// @desc    Register a new Buyer
// @access  Public
router.post("/", async (req, res) => {
  const { fusionUser, user } = req.body;
  //TODO validate buyer details before registering
  user.balance = getInitialBalance();
  user.firstName = fusionUser.firstName;
  user.lastName = fusionUser.lastName;
  try {
    const existingBuyer = await Buyer.findOne({
      "user.email": user.email,
    });
    if (existingBuyer) {
      return res.json({ message: "Email already exist" });
    }
    const requestOptions = {
      url: FUSION_BASE_URL + "/ifi/" + IFI_ID + "/applications/newIndividual",
      method: "POST",
      json: true,
      headers: {
        "Content-Type": "application/json",
        "X-Zeta-AuthToken": X_ZETA_AUTH_TOKEN,
      },
      body: { ...fusionUser },
    };
    request(requestOptions, async (err, response, body) => {
      if (err) throw err;
      const { statusCode } = response;
      if (statusCode == 200) {
        //console.log(`body`, body);
        const { status, individualID } = body;
        if (status == "APPROVED") {
          user.fusionID = individualID;

          //Issue a Bundle
          const { fusionID, firstName } = user;
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
          request(requestOptions, async (err, response, body) => {
            if (err) throw err;
            const { statusCode } = response;
            //console.log(`body`, body);
            if (statusCode == 200) {
              const { accountID } = body.accounts[0];
              const buyer = new Buyer({ user, accountID });
              await buyer.save();
              res.json({ ...body, buyerID: buyer._id });
            } else {
              return res.status(statusCode).json({ ...body });
            }
          });
        } else {
          res.json({ ...body });
        }
      } else {
        return res.status(statusCode).json({ ...body });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

// @route   GET /api/buyers/{buyerID}
// @desc    Get information of a particular buyer by his id
// @access  Protected
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const buyer = await Buyer.findById(id);
    if (!buyer) return res.status(404).json({ message: "Invalid merchantID" });

    const { fusionID } = buyer.user;
    const requestOptions = {
      url: FUSION_BASE_URL + "/ifi/" + IFI_ID + "/accountHolders/" + fusionID,
      method: "GET",
      json: true,
      headers: {
        "Content-Type": "application/json",
        "X-Zeta-AuthToken": X_ZETA_AUTH_TOKEN,
      },
    };

    request(requestOptions, (err, response, body) => {
      if (err) throw err;
      const { statusCode } = response;
      return res.status(statusCode).json({ ...body, buyer });
    });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

module.exports = router;
