import fs from "fs";
import path from "path";
import minimist from "minimist";
import { ethers } from "ethers";
import { LacchainProvider, LacchainSigner } from "@lacchain/gas-model-provider";

const privateKey = "8b2c4ca73a4ce874432997a1a0851ff11283996f512b39f2640d009d8dc8b408";
const nodeAddress = "0x211152ca21d5daedbcfbf61173886bbb1a217242";
const expiration = 1836394529;

const provider = new LacchainProvider('http://localhost:4545');
const signer = new LacchainSigner(
  privateKey,
  provider,
  nodeAddress,
  expiration
);

var args = minimist(process.argv.slice(2),{
    string: ['contractAddress'],
})

const sendTransaction = async() => {
	const StorageBuild = fs.readFileSync( path.resolve() + '/build/contracts/Storage.json' );
	const StorageJSON = JSON.parse( StorageBuild.toString() );
	console.log( 'Storage:', args.contractAddress);
	const storageContract = new ethers.Contract(args.contractAddress,StorageJSON.abi,signer);
	const tx = await storageContract.store(args.value);
	console.log('Tx hash:',tx.hash)
	await tx.wait();
	const owner = await storageContract.getOwner();
	console.log('contract owner:',owner);
	const result = await storageContract.retreive();
	console.log('New value set:',result.toString());
	
}

sendTransaction().catch( console.error );
