# Send a Private Transaction

## 1.  Pre-Requisites
A simple contract will be deployed which records a hash associated with the end user who sent the transaction. For this part you will need to have nodejs installed. Check whether node is installed on your local computer by running the following command:

``` bash
    $ node --version
```
 private channel running, follow the instructions deploy [private channel local](https://github.com/LACNetNetworks/besu-networks/tree/feature/tessera-getting-started/docker/compose/tessera).

## 2. Install dependencies
Please clone this repository. It contains all the code necessary to deploy a contract and send a  private transaction.

``` bash
    $ git clone https://github.com/lacchain/samples.git
```

Now download all the necessary dependencies.

``` bash
    $ cd samples/tessera
    $ npm install  
```

## 3. Configure
In the file `keys.js`  into directory `tessera`  include:
   * Tessera node public keys
   * Hyperledger Besu node RPC URLs
   * Hyperledger Besu node [private keys](https://besu.hyperledger.org/en/stable/Concepts/Node-Keys/#node-private-key).


## 3. deploy contract
In the `multiNodeExample` directory, deploy the contract:
``` bash
    $ node deployContract.js
```

A private transaction receipt returns.
```
 Transaction Hash  0x38a53fab1d466f0f8f7329ab1d3c0be6cc9c4a0fdcd06896800b313dc8de032b
 Waiting for transaction to be mined ...
 Private Transaction Receipt
 { contractAddress: '0xe5f0664574f8e24b3242e13265ef3d4886bfb27f',
  from: '0x211152ca21d5daedbcfbf61173886bbb1a217242',
  output:
  ....
 now you have to run:
 export CONTRACT_ADDRESS=0xe5f0664574f8e24b3242e13265ef3d4886bfb27f
```
Copy the contract address from the private transaction receipt and set the `CONTRACT_ADDRESS` environment variable

```
$ export CONTRACT_ADDRESS=<Contract Address from Private Transaction Receipt>
```

## 4. send private transaction

Store a value in the contract from Node 1:
```
$ node storeValueFromNode1.js
```

Node 1 stores the value of 1000 (3e8 in hex) and is visible to Node 1 and Node 2.
```
Transaction Hash: 0xa625e1782cd3469b9636b40e37a44788419b781bf5de88c3f784acb9f1757187
Waiting for transaction to be mined ...
Event Emitted: 0x000000000000000000000000211152ca21d5daedbcfbf61173886bbb1a21724200000000000000000000000000000000000000000000000000000000000003e8
Waiting for transaction to be mined ...
Get Value from http://localhost:4545: 0x00000000000000000000000000000000000000000000000000000000000003e8
Waiting for transaction to be mined ...
Get Value from http://localhost:4546: 0x00000000000000000000000000000000000000000000000000000000000003e8
Waiting for transaction to be mined ...
Get Value from http://localhost:4547: 0x
```
> Note: As expected, log messages indicate that Node 3 Tessera cannot find payloads because Node 3 does not have access to the private transactions between Node 1 and Node 2.