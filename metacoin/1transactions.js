const MetaCoin = artifacts.require("MetaCoin")
const fs = require('fs')

async function asyncFunction(instance,acc0,acc1,amount) {
  const transaction = await instance.sendCoin(acc0,acc1,amount);

    fs.appendFile("./../logs/lightTransactionOutputTimestamp.txt", Date.now(), function(err) {
        if(err) {
            return console.log(err);
        }
    })

    fs.appendFile("./../logs/lightTransactionOutputTimestamp.txt", "\n", function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The time was saved!");
    });

    fs.appendFile("./../logs/lightTransactionOutput.json", JSON.stringify(transaction), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
        console.log(transaction)
        return transaction
    }


function transactionFunc(instance, acc0, acc1, amount) {
  return new Promise((resolve) => {
    const transaction = asyncFunction(instance, acc0, acc1, amount)
    resolve(transaction)
  });
}

async function asyncGetBalance(instance, acc0) {
  return await instance.getBalance(acc0);
}

function balanceFunc(instance, acc0) {
  return new Promise((resolve) => {
    const balance = asyncGetBalance(instance, acc0)
    resolve(balance)
  });
}

module.exports = async function(callback) {

  try {
    var accounts = ["0x3590aca93338b0721966a8d0c96ebf2c4c87c544",
                    "0x8cc5a1a0802db41db826c2fcb72423744338dcb0",
                    "0xa1dd179d921ae78ba76e32c405fc10cfcddd2ba1",
                    "0x77053d905afd3302d71610543ebeb80ad2cf44bb",
                    "0x0baa50c29646037f88dea197155a6f351166f7ef",
                    "0x44924250402b3cd455851a6993b5285551c2bf5b",
                    "0xc17351dc036d12734e1996ef0245e089cebaed7e",
                    "0xca9c8e97518cf96976ac3cb5351867643cdf8fa7",
                    "0xb3196da18895149cd987a7c7167aea6378978ccb",
                    "0xc6b7b660ddb159959cc56724abc4ab481af390b3"];

    const instance = await MetaCoin.deployed();
    console.log('Instance fetched', instance.address);

    var balance = await instance.getBalance(accounts[0]);
    console.log('Balance:', balance.toNumber());

    var transaction;
    var promises = [];

  for(var j = 0; j < 1; j++) {
    for(var i = 0; i < 1; i++) {
      promises.push(transactionFunc(instance, accounts[0], accounts[i], 1))
    }
  }
    

    Promise.all(promises)
    .then(() => {
      balance = balanceFunc(instance, accounts[0]);
      return balance;
    })
    .then((balance) => {
      console.log('Balance:', balance.toNumber());
      callback();  
    })
    .catch((e) => {
      console.log(e)
      callback();
    });
  
  } catch(error) {
    console.log(error);
    callback();
  }
}
