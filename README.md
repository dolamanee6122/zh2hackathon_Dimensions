# Dimensions

## μ-Nim-G

# Folder Structure

- Server
- Client

## Tech Stack

- React JS
- Express
- Node
- MongoDB
- Material UI
- Zeta Fusion APIs

Prototype Stage PPT: [https://docs.google.com/presentation/d/1mvvYGChn0Pmba5X9lTBXE9kTzsk-6EHpb03FsRbkmz4/edit?usp=sharing]

Miro Board: [https://miro.com/app/board/o9J_l2Gkz3k=/]

## Problem Statement

> - Most transactions are credit based for SMEs.
> - Credit based System ensures loyal customer base.
> - Involves maintenance of hefty Khatabooks.
> - Regular Updates and Gigantic Calculations required
> - Leads to loss of records and sometimes disputes.
> - Retrieval/Recovery notices can take days to reach the borrower.

## Solution Proposed

> - Transparency of records from both ends.
> - Real time updates of records.
> - Records are accessibles anywhere at anytime.
> - Single Tap acceptance or rejection of Credit Requests.
> - Handle multiple shops with a single account.
> - Rating based profiles to ensure credibility.
> - Integration with Payment methods

## Fusion API endpoints Used

- ACCOUNT HOLDER APIS

  - Endpoint Used: {FUSION_BASE_URL}/ifi/{IFI_ID}/applications/newIndividual
  - Called this endpoint, during registration of user, which involves taking Name, email, DOB, PAN, Phone and account type (Buyer/Merchant) as input from user.
  - Used these Account Holder Api (called in backend) for creating new accounts to buyers and merchants.
  - We, the store the individual ID, received in response as reference in our MongoDB database for the application.
  - The above step allows the access of data of a user from both ‘Fusion APIs’ and MongoDB(stores application specific data)

- BUNDLE APIS

  - Endpoint Used:{FUSION_BASE_URL}/ifi/{IFI_ID}/bundles/{BUNDLE_ID}/issue
  - Called this endpoint, first when a buyer registered for issuing account and payment instrument.
  - Second, when a merchant add a new shop, each shop got a new account and payment instrument.
  - Used these Apis for issuing account product and payment product for buyers and merchants.
  - We store the accountID, received in response as reference in our MongoDB database for the application.
    The above step helps us to do fund transfer between shop and buyer.

- FUND TRANSFER APIS
  - Endpoint Used: /api/v1/ifi/{ifiID}/individuals/{individualID}/beneficiaries
  - When a merchant accepts the credit request of a buyer, then there is no handling of “Real Money” involved and we only update our application database.
  - But, when the buyer pays the amount, then we call the account to account transfer Fusion API to actually transfer money.
  - Simply, Transaction APIs are called only when real money transaction in carried out.
  - However, the application specific MongoDB is always updated, irrespective of nature of transaction.

To run the app, first clone this repository.

```sh
git clone
```

Install the dependencies and devDependencies and start the server in Dimensions/Server.

```sh
cd Dimensions
cd server
npm i
nodemon
```

Similarly Install the dependencies and devDependencies and start the react app

```sh
cd Dimensions
cd client
npm i
npm start
```

## Other Requirements

> - "IFI_ID"
> - "BUNDLE_ID"
> - "X_ZETA_AuthToken
> - "Secret MongoURI"
> - "jwt Secret"

> - For Hackathon judgement only we are exposing the mongoURI for sometime, Create a new folder called "config" inside /server  and create a new file called "default.json"

- Zeta  team will be having our X_Zeta_AuthToken, IFI_ID and BUNDLE_ID 
-   "mongoURI": "mongodb+srv://dolamanee6122:Dolamanee@mongodb@1036@cluster0.xt3vs.mongodb.net/dimensions?retryWrites=true&w=majority"
-  "jwtSecret": "KOTRAROADMEDARORATKOKOTRAROADMEDARORATKO"
-  "FUSION_BASE_URL": ["https://fusion.preprod.zeta.in/api/v1"]
