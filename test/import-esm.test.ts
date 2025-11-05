import * as assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, it } from "node:test";

void describe("ESM import", () => {
  void it("can import the built package from ESM", () => {
    const result = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `
        import { id62 } from './dist/index.js';
        const id = id62();
        if (!/[0-9A-Za-z]{21}/.test(id)) {
          throw new Error('Invalid ID format: ' + id);
        }
        console.log('ESM import successful:', id);
      `,
      ],
      {
        cwd: join(__dirname, ".."),
        encoding: "utf8",
      },
    );

    assert.strictEqual(result.status, 0, `ESM import failed: ${result.stderr}`);
    assert.match(result.stdout, /ESM import successful/);
  });
});
