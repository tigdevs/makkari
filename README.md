<p align="center">
  <img src="https://github.com/tigdevs/makkari/blob/master/extra/logo.png" />
</p>

<p align="center">
  <img alt="Build" src="https://github.com/tigdevs/makkari/workflows/build/badge.svg" />
  <img alt="Test" src="https://github.com/tigdevs/makkari/workflows/test/badge.svg" />
  <a href="https://badge.fury.io/js/makkari"><img src="https://badge.fury.io/js/makkari.svg" alt="npm version"></a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Makkari is a library developed in NodeJS that aims to execute multiple database queries using Worker Threads. In order to reach significant numbers, we created several workers which will execute queries in parallel. Initially Makkari was developed for internal projects, but we understand that it can be useful for other developers..

To run the queries, we use some knowing libraries as pg, mysql, among others.

## Quick Start

```javascript
const { Makkari } = require('makkari')

const queries = Array(50).fill('select * from example, pg_sleep(5) limit 1')

const database = {
  type: 'postgres',
  config: {
    database: 'postgres',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
  },
}https://github.com/tigdevs/makkari#readme

const makkari = new Makkari({ queries, database })

const main = async () => {
  console.time('QUERY')
  console.log(await makkari.run())
  console.timeEnd('QUERY')
}

main()
```

## Benchmarks

> Send 50 queries and sleep for 5 seconds after execute then

| Library |                    Query                    |     Duration |
| ------- | :-----------------------------------------: | -----------: |
| pg      | select \* from example, pg_sleep(5) limit 1 |    4 minutes |
| makkari | select \* from example, pg_sleep(5) limit 1 | 6.04 seconds |

## Supported Databases

| Database |     Status     |
| -------- | :------------: |
| pg       |    working     |
| mysql    | in development |

## Install

```sh
yarn add makkari
```

## Run tests

```sh
yarn test
```

- Github: [@tigdevs](https://github.com/tigdevs)

## 🤝 Contributing

You can contribute to Makkari in following ways:

- [Report issues](https://github.com/tigdevs/makkari/issues) and help us verify fixes as they are checked in.
- Review the [source code changes](https://github.com/tigdevs/makkari/pulls).
- Contribute creating new database modules to Makkari.
- Contribute bug fixes.
