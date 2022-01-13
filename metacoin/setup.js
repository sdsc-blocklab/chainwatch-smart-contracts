const MetaCoin = artifacts.require("MetaCoin")

async function asyncFunction(instance,acc0,acc1,amount) {
  const transaction = await instance.sendCoin(acc0,acc1,amount);
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
    var accounts = ["0x0207316d3C423cF5466579be2359e029c6D1c2dc",
                    "0xE1affe1774af026Ed1021e40D29FCb19DED335Ed",
                    "0x75803967FB0418f558f420B810F1df65f354A2f1",
                    "0x44924250402b3cd455851a6993b5285551c2bf5b",
                    "0xc17351dc036d12734e1996ef0245e089cebaed7e",
                    "0x57c8b04534c031f9177c8be9f06d2f9111ef369d",
                    "0x755cfd3e74df4c680f92e7954ae2cedb121e229e",
                    "0xca9c8e97518cf96976ac3cb5351867643cdf8fa7",
                    "0xb3196da18895149cd987a7c7167aea6378978ccb",
                    "0xc6b7b660ddb159959cc56724abc4ab481af390b3"];

    const instance = await MetaCoin.deployed();
    console.log('Instance fetched', instance.address);

    var balance = await instance.getBalance(accounts[0]);
    console.log('Balance:', balance.toNumber());

    var transaction;
    var promises = [];
    while(true){
        for(var j = 0; j < 10; j++) {
            for(var i = 0; i < 10; i++) {
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

        setTimeout(alertFunc, 10000);

        function alertFunc() {
            alert("=======NEXT SET OF TRANSACTIONS=======");
        }
    }
  
  } catch(error) {
    console.log(error);
    callback();
  }
}