import { GENESIS_DATA } from "./config";
import cryptoHash from "./cryptoHash";

export default class Block {
  data: any;
  timestamp: string;
  lastHash: string;
  hash: string;
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.data = data;
    this.lastHash = lastHash;
    this.hash = hash;
  }
  static genesis() {
    return new this(GENESIS_DATA);
  }
  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    return new this({
      timestamp: timestamp,
      data,
      lastHash: lastBlock.hash,
      hash: cryptoHash(timestamp, lastBlock.hash, data),
    });
  }
}
