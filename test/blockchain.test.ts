import Block from "../block";
import Blockchain from "../blockchain";

describe("Blockchain", () => {
  let blockchain: Blockchain, newChain: Blockchain, originalChain: Block[];
  beforeEach(() => {
    blockchain = new Blockchain();
    originalChain = blockchain.chain;
    newChain = new Blockchain();
  });
  it("should contains a `chain` Array instance ", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });
  it("should start with the genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });
  it("adds new block to the chain", () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toBe(newData);
  });
  describe("isValidChain()", () => {
    describe("when the chain does not start with the genesis block ", () => {
      it("should return false", () => {
        blockchain.chain[0] = {
          timestamp: "1",
          data: "fake data",
          hash: "hash",
          lastHash: "lastHash",
        };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });
    describe("when the chain starts with the genesis block and has multiple blocks", () => {
      beforeEach(() => {
        // add multiple block to our blockchain instance
        blockchain.addBlock({ data: "bears" });
        blockchain.addBlock({ data: "beets" });
        blockchain.addBlock({ data: "jumbo" });
      });
      describe("and a lastHash reference has changed", () => {
        it("should return false", () => {
          blockchain.chain[2].lastHash = "broken-lastHash";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe("and the chain contains a block with an invalid field", () => {
        it("should return false", () => {
          blockchain.chain[2].data = "some-bad-data";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe("and the chain does not contain any invalid blocks", () => {
        it("should return true", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
  describe("replaceChain()", () => {
    describe("when the new chain is not longer", () => {
      it("does not replace ", () => {
        newChain.chain[0] = {
          data: "chain",
          timestamp: "",
          hash: "",
          lastHash: "",
        };
        blockchain.replaceChain(newChain.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });
    });
    describe("when the new chain is longer", () => {
      beforeEach(() => {
        newChain.addBlock({ data: "bears" });
        newChain.addBlock({ data: "beets" });
        newChain.addBlock({ data: "jumbo" });
      });
      describe("when the chain is valid", () => {
        it("does replace", () => {
          blockchain.replaceChain(newChain.chain);
          expect(blockchain.chain).toEqual(newChain.chain);
        });
      });
      describe("when the chain is invalid", () => {
        it("does not replace", () => {
          // mutate chain
          newChain.chain[2].hash = "fake-hash ";
          blockchain.replaceChain(newChain.chain);
          expect(blockchain.chain).toEqual(originalChain);
        });
      });
    });
  });
});
