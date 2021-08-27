import React, { useState } from 'react'

export const useCreds = () => {
    function getToken(){
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      }
       function getId()
       {
        const idString = localStorage.getItem('userId');
        const userId = JSON.parse(idString);
        return userId?.token
       }
       function getAccountType()
       {
        const account = localStorage.getItem('accountType');
        const userId = JSON.parse(account);
        return account?.token
       }
       function getCreds()
       {
         const id=getId();
         const token=getToken();
         const accountType=getAccountType();
         console.log(`efk`,{id:id,token:token, account:accountType} )
         return {id:id,token:token, account:accountType};
       }


    const [creds,setCreds]=useState(getCreds());

    const saveCreds = creds => {
        localStorage.setItem('token', JSON.stringify(creds.token));
        localStorage.setItem('userId', JSON.stringify(creds.id));
        localStorage.setItem('accountType', JSON.stringify(creds.accountType));
        console.log('in save creds',creds);
        setCreds(creds);
      };
      return {
        setCreds: saveCreds,
        creds
      }
}
