import chalk from "chalk";

import Block from "./block";
import cryptoHash from "./cryptoHash";

export default class Blockchain {
  chain: Array<Block>;
  constructor() {
    this.chain = [];
    this.chain.push(Block.genesis());
  }
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      data,
      lastBlock: this.chain[this.chain.length - 1],
    });
    this.chain.push(newBlock);
  }

  static isValidChain(chain: Array<Block>): boolean {
    const genesis = Block.genesis();

    // javascript object is a reference type that's means in variable is a reference to the actual data store on the heap
    const isGen = Object.keys(genesis).every(
      field => genesis[field] === chain[0][field]
    );
    if (!isGen) return false;
    //
    for (let i = 1; i < chain.length; i++) {
      // current block
      const { timestamp, data, lastHash, hash } = chain[i];
      const actualLastHash = chain[i - 1].hash;

      // validate chain
      if (lastHash !== actualLastHash) return false;

      // validate hash itself based on data and lastHash
      const validateHash = cryptoHash(timestamp, lastHash, data);
      if (validateHash !== hash) return false;
    }
    // if every thing is all right chain is valid
    return true;
  }

  // it's not an static method because we do replace for each individual instances of Blockchain class - because each blockchain has it's own chain
  // replacing a chain is base on an individual instance of the blockchain
  replaceChain(newChain: Array<Block>): void {
    if (newChain.length <= this.chain.length) {
      console.log(chalk.red("the incoming chain must be longer."));
      return;
    }
    if (!Blockchain.isValidChain(newChain)) {
      console.log(chalk.red("the incoming chain is invalid."));
      return;
    }
    console.log(chalk.green("replacing chain done"));
    this.chain = newChain;
  }
}
