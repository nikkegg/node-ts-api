import { isStrictlyAlphabetic } from "@src/utils/util";

describe("isStrictlyAlphabetic", () => {
  it("does not allow numbers", () => {
    expect(isStrictlyAlphabetic("Mynameis123")).toBe(false);
  });
  it("does not allow special characters", () => {
    expect(isStrictlyAlphabetic("Myname./%$/\\")).toBe(false);
  });
  it("allows spaces", () => {
    expect(isStrictlyAlphabetic("Juno Hender")).toBe(true);
  });
  it("allows hyphen", () => {
    expect(isStrictlyAlphabetic("Anne-Marie")).toBe(true);
  });
});
