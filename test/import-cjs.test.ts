import * as assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, it } from "node:test";

void describe("CommonJS import", () => {
  void it("can require() the built package", () => {
    const result = spawnSync(
      process.execPath,
      [
        "-e",
        `
        const { id62 } = require('./dist/index.js');
        const id = id62();
        if (!/[0-9A-Za-z]{21}/.test(id)) {
          throw new Error('Invalid ID format: ' + id);
        }
        console.log('CJS import successful:', id);
      `,
      ],
      {
        cwd: join(__dirname, ".."),
        encoding: "utf8",
      },
    );

    assert.strictEqual(
      result.status,
      0,
      `CJS require failed: ${result.stderr}`,
    );
    assert.match(result.stdout, /CJS import successful/);
  });
});
