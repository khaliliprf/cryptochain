import Block from "../block";
import { GENESIS_DATA } from "../config";
import cryptoHash from "../cryptoHash";

describe("Block", () => {
  const timestamp = "date";
  const lastHash = "lasthash";
  const hash = "hash";
  const data = ["dankan"];
  const block = new Block({ timestamp, lastHash, hash, data });
  it("should create a block with given data", () => {
    expect(block.data).toBe(data);
    expect(block.lastHash).toBe(lastHash);
    expect(block.hash).toBe(hash);
    expect(block.timestamp).toBe(timestamp);
  });
  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    it("should returns a block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });
    it("should returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });
  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.mineBlock({ lastBlock, data });
    it("should returns a block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });
    it("should sets the `lastHash` to be the `hash` of the last block", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });
    it("should sets the `data`", () => {
      expect(minedBlock.data).toEqual(data);
    });
    it("should sets a `timestamp` ", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
    it("should create proper SHA-256 hash based on input", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
      );
    });
  });
});
