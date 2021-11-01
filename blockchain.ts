import Block from "./block";

export default class Blockchain {
  chain: Array<Block>;
  constructor() {
    this.chain = [];
    this.chain.push(Block.genesis());
  }
  addBlock(data) {
    const newBlock = Block.mineBlock({
      data,
      lastBlock: this.chain[this.chain.length - 1],
    });
    this.chain.push(newBlock);
  }
}
