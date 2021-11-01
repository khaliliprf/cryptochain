import cryptoHash from "../cryptoHash";

describe("cryptoHash()", () => {
  const hash1 = cryptoHash("foo");
  const hash2 = cryptoHash("foo");
  it("should generates a SHA-256", () => {
    expect(cryptoHash("foo")).toEqual(
      "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
    );
  });
  it("should return same hash for the same input in any order", () => {
    expect(hash1).toEqual(hash2);
  });
  it("should return same hash for the same input in any order", () => {
    expect(cryptoHash("one", "two", "three")).toEqual(
      cryptoHash("three", "one", "two")
    );
  });
});
