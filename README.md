# id62: Base-62 Random UUIDs for Node.js

[![npm](https://img.shields.io/npm/v/id62)](https://www.npmjs.com/package/id62)
[![CircleCI](https://img.shields.io/circleci/build/github/trevorr/id62)](https://circleci.com/gh/trevorr/id62)

A small, fast base-62 universally unique identifier (UUID) generator for Node.js written in Typescript.

## Goals/Benefits

* Alphanumeric base-62 (`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`)
  * Relatively compact (21 digits compared to 36 of hexadecimal OSF DCE UUID)
  * URL path and filename compatible (no slash like some base-64 alphabets)
  * Easy double-click selection for copy/paste (most apps only select alphanumeric characters)
* Exact same number of random bits (122) as [OSF DCE UUID v4](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))
  * Same negligible collision probability ("the probability to find a duplicate within 103 trillion version-4 UUIDs is one in a billion")
  * Could be translated to a hexadecimal UUID v4 for interoperability if necessary
* Fixed-length representation (leading zeroes not dropped)
* Cryptographically secure randomization (from Node's `crypto.randomBytes`)
* Avoid unnecessary steps, such as converting a UUID v4 string to base-62
* No dependencies

## Installation

```sh
npm install id62
```

## Usage

```ts
import id62 from 'id62';

console.log(id62()); // 0KwQZuxQNLAxV7a7mFm16
```

## License

`id62` is available under the [ISC license](LICENSE).
