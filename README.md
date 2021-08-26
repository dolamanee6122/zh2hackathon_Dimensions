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

Miro Board: [https://miro.com/app/board/o9J_l3rDDwA=/]

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
> - Records  are accessibles anywhere at anytime.
> - Single Tap acceptance or rejection of Credit Requests.
> - Handle multiple shops with a single account.
> - Rating based profiles to ensure credibility.
> - Integration with Payment methods 

## Fusion API endpoints Used
- Account Holder APIs
- Bundle APIs
- Transaction APIs

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
