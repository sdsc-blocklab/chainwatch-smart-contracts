# Development Environment
Once a dev network is running (reference [chainwatch-geth-network](https://github.com/sdsc-blocklab/chainwatch-geth-network.git))

# Migrating Metacoin
Once the network is running we can now migrate the smart contract with the network. 

We need to configure `truffle-config.js` so that the contract knows where to deploy. This file can be found in the `metacoin` directory. In the config file we need to specify the host ip address, the rpc port and the network id. The config file should look something like:
```
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  }
};
```

Once the account has been unlocked change directory into the `metacoin` directory and migrate the truffle smart contract with the network:
`$ cd metacoin`
`$ truffle migrate`

# Interacting with the Smart Contract
In the following series of transactions a second account will be needed to do this attach to the geth node and run:
```
> personal.newAccount()
```
If you now run:
```
> personal.listAccounts
```
You will now see two accounts, exit out of the geth node and change directory to the metacoin directory

In the metacoin directory we first need to enter the truffle console:
`$ truffle console`
Once inside we need to establish both the contract and accounts:
```
> let instance = await MetaCoin.deployed()
> let accounts = await web3.eth.getAccounts()
```
We can then check the metacoin balance of the account which the smart contract was deployed onto
```
> let balance = await instance.getBalance(accounts[0])
> balance.toNumber()
```

We can then see how much the metacoin is worth in ether
```
> let ether = await instance.getBalanceInEth(accounts[0])
> ether.toNumber()
```

To transfer metacoin from account[0] to account[1]
```
> instance.sendCoin(accounts[0], accounts[1], 500)
```

Check the balance of the account that recieved the metacoin
```
> let received = await instance.getBalance(accounts[1])
> received.toNumber()
```

Check the new balance of the account that sent the metacoin
```
> let newBalance = await instance.getBalance(accounts[0])
> newBalance.toNumber()
```

