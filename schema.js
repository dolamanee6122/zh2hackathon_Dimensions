//user
user={
    id,
    salutation,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    email,
    password,
    profilePicURL,
    mobileNo,
    createdAt,
    updatedAt,
    accountType,
    shopIDList,
    balance:{
        balance,
        credit,
        debit,
    },
    balanceShopWise:[
        shop1:{
            balance:{
                balance,
                credit,
                debit,
            }
        },
    ],
};


//Transaction
transaction={
    transactionID,
    userID,
    shopID,
    previousBalance,
    newBalance,
    timestamp,
    amount,
    currency,
    recordType,
    remarks,
    attributes:{
        referenceTransactionID,
        paymentMode,
    }
}

//Shop
shop={
    shopID,
    shopName,
    merchantID,
    address,
    rating,
    customer:[userID1, userID2],
    balance:{
        credit,
        debit,
        balance,
    },
    allTimeBalance:{
        credit,
        debit,
        balance,
    },
    transactionList:[
        {userID1:[transaction1, transaction2]},
        {userID2:[transaction1, transaction2]},
    ],
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
    last5Transaction:[],
    last3Request:[],
}

//buyer
buyer={
    user,
    rating,
    transactionList:[
        {shopID1:[transaction1, transaction2]},
        {shopID2:[transaction1, transaction2]},
    ],
}

//merchant
merchant={
    user,
    shopList:[
        shopID1,
        shopID2,
    ],
}