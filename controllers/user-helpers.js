var db = require('../config/connection');
var collections = require('../config/collections');
const bcrypt = require('bcrypt');
const { resolve } = require('path');


module.exports = {
    doSignUp(userData){
        return new Promise(async(resolve,reject)=>{
            userData.password = await bcrypt.hash(userData.password, 10);
            db.getDb().collection(collections.USER_COLLECTION).insertOne(userData).then((data)=>{
                console.log(data);
                
                resolve(data);
            })
        })
    },

    doLogin(userDate){
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false;
            let response = {};
            let user = await db.getDb().collection(collections.USER_COLLECTION).findOne({email:userDate.email});
            if(user){
                bcrypt.compare(userDate.password,user.password).then((status)=>{
                    if(status){
                        console.log('login success');
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    }else{
                        console.log('login failed');
                        resolve({status:false});
                    }
                })
            }else{
                console.log('login failed');
                resolve({status:false});
            }
        })
    }
}