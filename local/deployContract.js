import fs from "fs";
import path from "path";
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

const deployStorage = async() => {
	const StorageBuild = fs.readFileSync( path.resolve() + '/build/contracts/Storage.json' );
	const StorageJSON = JSON.parse( StorageBuild.toString() );
	const Storage = new ethers.ContractFactory( StorageJSON.abi, StorageJSON.bytecode, signer );
	const contract = await Storage.deploy( { gasLimit: 1000000, gasPrice: 0 } );
	const receipt = await contract.deployTransaction.wait();
	const contractAddress = receipt.contractAddress;
	console.log( 'Storage address:', contractAddress );
}

deployStorage().catch( console.error );
