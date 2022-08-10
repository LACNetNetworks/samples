import fs from "fs";
import path from "path";
import ethers from "ethers";
import minimist from "minimist";

const provider = new ethers.providers.JsonRpcProvider( 'http://localhost:8545' );
const privateKey = "8b2c4ca73a4ce874432997a1a0851ff11283996f512b39f2640d009d8dc8b408";
const contractAddress = "0x1Fa12c57ABab623beCc34A69cB526AD39c6338D6";
const signer = provider.getSigner()
var wallet = new ethers.Wallet(privateKey);
wallet = wallet.connect(provider);

var args = minimist(process.argv.slice(2),{})

const sendTransaction = async() => {
	const RelayHubBuild = fs.readFileSync( path.resolve() + '/build/contracts/TxRelay.json' );
	const RelayHubJSON = JSON.parse( RelayHubBuild.toString() );
	console.log( 'Storage:', args.contractAddress);
	const relayHubContract = new ethers.Contract(contractAddress,RelayHubJSON.abi,wallet);
	const tx = await relayHubContract.setMaxGasBlockLimit(args.gasLimit, { gasLimit: 500000, gasPrice: 0 });
	console.log('Tx hash:',tx.hash)
	await tx.wait();
	const result = await relayHubContract.getMaxGasBlockLimit();
	console.log('New GasLimit set:',result.toString());
	
}

sendTransaction().catch( console.error );