import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import id62 from "../src/index";

void describe("id62", () => {
  void it("returns 21 alphanumeric digits", () => {
    assert.match(id62(), /[0-9A-Za-z]{21}/);
  });
});
