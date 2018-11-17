const SHA256 = require ('crypto-js/sha256');
class Block{
	constructor(index , timeStamp , data , previousHash = ''){
		this.index = index;
		this.timeStamp = timeStamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timeStamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0,"16/11/2018","Some data","0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}
	addBlock(newBlock){
		newBlock.previousHash=this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
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
//ToDo
//Write proof-of-work
let symonCoin = new Blockchain();
symonCoin.addBlock(new Block(1,"17/11/2018" , {amount : 5}));
symonCoin.addBlock(new Block(2,"18/11/2018" , {amount : 6}));
console.log("BlockChain is " + symonCoin.isChainValid() === 0 ? "not valid":"valid") ;
console.log(JSON.stringify(symonCoin , null, 5));
