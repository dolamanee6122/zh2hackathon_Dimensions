// {base_url}/register/buyer
// REQUEST
val = {
  ifiID: 0,
  formID: "string",
  accountHolderType: "string",
  email: "string",
  password: "string",
  salutation: "string",
  firstName: "string",
  middleName: "string",
  lastName: "string",
  profilePicURL: "string",
  dob: "2021-08-06",
  gender: "string",
  mobile_no: "number",
  kycDetails: {
    kycStatus: "string",
    updateTime: "2021-08-06T12:00:03.277Z",
    expiryTime: "2021-08-06T12:00:03.277Z",
    kycStatusPostExpiry: "string",
    authType: "string",
    authData: {},
  },
};

//RESPONSE
ans = {
  id: "string",
  rating: "",
  balance: "",
  ifiID: 0,
  formID: "string",
  accountHolderType: "string",
  email: "string",
  password: "string",
  salutation: "string",
  firstName: "string",
  middleName: "string",
  lastName: "string",
  profilePicURL: "string",
  dob: "2021-08-06",
  gender: "string",
  mobile_no: "number",
  kycDetails: {
    kycStatus: "string",
    updateTime: "2021-08-06T12:00:03.277Z",
    expiryTime: "2021-08-06T12:00:03.277Z",
    kycStatusPostExpiry: "string",
    authType: "string",
    authData: {},
  },
  createdAt: "2021-08-06T12:00:03.457Z",
  updatedAt: "2021-08-06T12:00:03.457Z",
  accountStatus: "string",
};

// returns all transactions for a merchant
// {base_url}/trxns/merchant/{merchant_id}

//RESPONSE
ans = {
  merchantTransactionList: [
    {
      buyerID: "string",
      shopID: "string",
      transactionID: "string",
      previousBalanace: "number",
      newBalance: "number",
      timestamp: "number",
      amount: number,
      currency: "string",
      recordType: "string",
      remarks: "string",
      attributes: {
        referenceTransactionID: "string",
        paymentMode: "",
      },
    },
    {
      buyerID: "0e3ba859-1d1e-4682-a0a9-1e82986d2dcb",
      transactionID: "20200724080555778_46955_301955000979",
      previousBalance: 798,
      newBalance: 697,
      timestamp: 1595577955811,
      amount: 101,
      currency: "INR",
      recordType: "DEBIT",
      remarks: "TEST",
      attributes: {
        realTransactionID: "string",
        paymentMode: "string",
      },
    },
  ],
};

// returns all transactions for a buyer
// {base_url}/trxns/buyer/{buyer_id}

//RESPONSE
ans = {
  buyerTransactionList: [
    {
      merchantID: "string",
      shopID: "string",
      transactionID: "string",
      previousBalanace: "number",
      newBalance: "number",
      timestamp: "number",
      amount: number,
      currency: "string",
      recordType: "string",
      remarks: "string",
      attributes: {
        realTransactionID: "string",
        paymentMode: "string",
      },
    },
    {
      merchantID: "0e3ba859-1d1e-4682-a0a9-1e82986d2dcb",
      transactionID: "20200724080555778_46955_301955000979",
      previousBalance: 798,
      newBalance: 697,
      timestamp: 1595577955811,
      amount: 101,
      currency: "INR",
      recordType: "DEBIT",
      remarks: "TEST",
      attributes: {
        realTransactionID: "string",
        paymentMode: "string",
      },
    },
  ],
};

// returns all transactions for a shop
// {base_url}/trxns/buyer/{shop_id}

//RESPONSE
ans = {
  merchantID: "string",
  shopTransactionList: [
    {
      shopID: "string",
      transactionID: "string",
      previousBalanace: "number",
      newBalance: "number",
      timestamp: "number",
      amount: number,
      currency: "string",
      recordType: "string",
      remarks: "string",
      attributes: {
        realTransactionID: "string",
      },
    },
    {
      merchantID: "0e3ba859-1d1e-4682-a0a9-1e82986d2dcb",
      transactionID: "20200724080555778_46955_301955000979",
      previousBalance: 798,
      newBalance: 697,
      timestamp: 1595577955811,
      amount: 101,
      currency: "INR",
      recordType: "DEBIT",
      remarks: "TEST",
      attributes: {
        realTransactionID: "string",
        paymentMode: "string",
      },
    },
  ],
};

// returns transaction details for a transactionID
// GET /trxn/trxn_id

ans = {
  transactionID: "string",
  buyerID: "string",
  shopID: "string",
  merchantID: "string",
  previousBalance: 798,
  newBalance: 697,
  timestamp: "number",
  amount: "number",
  currency: "string",
  recordType: "DEBIT",
  remarks: "string",
  attributes: {
    realTransactionID: "string",
    paymentMode: "string",
  },
};

// do a transaction
// POST {base_url}/trxn

// Add customer to a shop, merchant
// POST {base_url}/merchant/addcustomer

// REQUEST

ans = {
  buyerID: "string",
  shopID: "string",
  requestID: "8439eknhvutcvh44425ut",
  isNewCustomer: "true",
  isApproved: "false",
  amount: {
    currency: "INR",
    amount: 0,
  },
  transferCode: "ATLAS_P2M_AUTH", //not sure if required
  debitAccountID: "c3b61955-f392-4f7a-905b-d561a462decc",
  creditAccountID: "422782d2-adcd-49a6-bde1-eb0461a582ba",
  transferTime: 1574741608000,
  remarks: "Fund transfer test",
  attributes: {},
};

//RESPONSE

//SUCCESS
ans = {
  requestID: "8439eknhvutcvh44428ut",
  transferID: "20200806154945431_562_8439eknhvutcvh44428ut",
  status: "SUCCESS",
  balance: "", //balance of merchant
  balanceForCustomer: "",
};

//FAILED
ans = {
  code: "REQUEST_MISMATCH",
  message: "The request has an old requestID, but different content",
  details: {
    errorCode: "REQUEST_MISMATCH",
  },
};

// Add shop for a merchant
// {base_url}/merchant/newShop

//REQUEST
ans = {
  userID: "string",
  shop: {},
  timestamp: "",
};

//RESPONSE
ans = {
  status: "string",
  message: "",
  shopID: "",
};

// send request to a shop
// {base_url}/buyer/addShop

//REQUEST
ans = {
  userID: "string",
  shopID,
  amount: {
    currency: "INR",
    amount: 21,
  },
  timestamp: "",
};

//RESPONSE
ans = {
  status: "string",
  message: "",
  requestID: "",
};

// returns details of merchant
// {base_url}/merchant/merchant_id

//RESPONSE
ans = {
  salutation: "string",
  firstName: "string",
  middleName: "string",
  lastName: "string",
  profilePicURL: "string",
  dob: "2021-08-06",
  gender: "string",
  mobile_no: "number",
  currency: "string",
  balance: "number",
  shops: [
    {
      shopID: "string",
      rating: "",
      balance: "number",
    },
    {
      shopID: "string",
      rating:"",
      balance: "number",
    },
  ],
};

// returns details of buyer
// {base_url}/merchant/buyer_id

//RESPONSE
ans = {
  firstName: "string",
  middleName: "string",
  lastName: "string",
  profilePicURL: "string",
  dob: "2021-08-06",
  gender: "string",
  mobile_no: "number",
  currency: "string",
  balance: "number",
  rating: "",
  shops: [
    {
      shopID: "string",
      balance: "number",
      statistics: {
        updatedTimestamp: "number",
        /*
        needed very rarely
        allTime: {
          credit: "number",
          debit: "number",
        },*/
        today: {
          date: "",
          credit: "number",
          debit: "number",
        },
        thisweek: {
          week: "",
          credit: "number",
          debit: "number",
        },
        thismonth: {
          month: "",
          credit: "number",
          debit: "number",
        },
      },
      last5Transaction: [
        { tr1: "" },
        { tr2: "" },
        { tr3: "" },
        { tr4: "" },
        { tr5: "" },
      ],
  ],
  statistics: {
    updatedTimestamp: "number",
    allTime: {
      credit: "number",
      debit: "number",
    },
    today: {
      credit: "number",
      debit: "number",
    },
    thisweek: {
      credit: "number",
      debit: "number",
    },
    thismonth: {
      credit: "number",
      debit: "number",
    },
  },
  last5Transaction: [
    { tr1: "" },
    { tr2: "" },
    { tr3: "" },
    { tr4: "" },
    { tr5: "" },
  ],
  last3Request: [{ re1: "" }, { re2: "" }, { re3: "" }],
};

// shop Information
// {base_url}/shop/shop_id

//RESPONSE
ans = {
  name: "string",
  address: "",
  shopID: "string",
  balance: "string",
  merchantID: "string",
  rating: "",
  statistics: {
    updatedTimestamp: "number",
    allTime: {
      credit: "number",
      debit: "number",
    },
    today: {
      credit: "number",
      debit: "number",
    },
    thisweek: {
      credit: "number",
      debit: "number",
    },
    thismonth: {
      credit: "number",
      debit: "number",
    },
  },
};
