# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-05

### Changed
- **BREAKING**: Upgraded minimum Node.js version from 12 to 20
- **BREAKING**: Transpiled code now targets ES2022 (previously ES2019)
- Switched from Node.js `crypto` module to Web Crypto API (`globalThis.crypto`), enabling browser support
- Switched from Mocha to Node.js native test runner
- Switched from NYC to c8 for code coverage
- Upgraded ESLint from v6 to v9 with flat config
- Upgraded TypeScript from v3.7 to v5.9
- Upgraded Prettier from v1.19 to v3.6
- Updated all development dependencies to latest versions
- Modernized code formatting and linting rules
- Disabled unneeded `esModuleInterop` in TypeScript configuration

### Added
- Browser support via Web Crypto API
- Named export for `id62` function (in addition to existing default export)
- Explicit CommonJS and ESM import tests to verify package compatibility
- `pretest` script to ensure build runs before tests
- `exports` field in package.json for better module resolution
- `type: "commonjs"` field for explicit module type declaration
- `sideEffects: false` for better tree-shaking support
- Additional keywords for better npm discoverability

## [1.0.0] - 2022-02-21

- Initial release

[2.0.0]: https://github.com/trevorr/id62/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/trevorr/id62/releases/tag/v1.0.0
