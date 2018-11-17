const SHA256 = require ('crypto-js/sha256');
class Block{
	constructor(index , timeStamp , data , previousHash = ''){
		this.index = index;
		this.timeStamp = timeStamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timeStamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Block mined : " + this.hash);
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
	}

	createGenesisBlock(){
		return new Block(0,"16/11/2018","Some data","0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}
	addBlock(newBlock){
		newBlock.previousHash=this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	isChainValid(){
		//Add simple check 
		// Will be deleted soon
		for(let i=1; i<this.chain.length;i++){
			 const currentBlock = this.chain[i];
			 const previousBlock = this.chain[i-1];
			 if(currentBlock.hash !== currentBlock.calculateHash()){
			 	return false;
			}
			 if(currentBlock.previousHash !==previousBlock.hash){
			 	return false;
			 }
			}
	return true;
	}
}

//Usage

let symonCoin = new Blockchain();

console.log('Mining block 1');
symonCoin.addBlock(new Block(1,"17/11/2018" , {amount : 5}));
console.log('Mining block 2');
symonCoin.addBlock(new Block(2,"18/11/2018" , {amount : 6}));
