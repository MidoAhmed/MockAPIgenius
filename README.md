# MockAPIexplorer

This repo is a Benchmark/Explore of different/collection tools for mocking REST APIs for front-end development and testing

## Subject:

When it comes to mocking APIs for front-end development & testing, there are two main approaches you can consider:

1. Server-Side Mocking.
2. **Client-Side Mocking**
   - Tools: (MirageJS, MSW, JSON Server, etc…)
   - Manual Mocking: (writing mock data / functions in a file and importing it in the test file)

Goal ==> Explore different tools for mocking REST APIs for front-end development and testing.

## Tools:

**Tested tools and technologies include (branch by tool):**

- [Mirage JS](https://miragejs.com/)
- [MSW](https://mswjs.io/) + [@mswjs/data](https://github.com/mswjs/data)
- ~~[json-server](https://github.com/typicode/json-server)~~ (not tested yet)
- ~~[fetch-mock](http://www.wheresrhys.co.uk/fetch-mock/)~~ (not tested yet)
- ~~[nock](https://github.com/nock/nock)~~ (not tested yet)
- ~~[superagent](https://ladjs.github.io/superagent/)~~ (not tested yet)

> Other tools that may be tested in the future include:

- [Mockoon](https://mockoon.com/)
- [WireMock](http://wiremock.org/)
- [MockServer](https://www.mock-server.com/)

Tools and technologies used in this project are not necessarily recommended for production use.

## Getting Started

### Prerequisites

- Node.js ( v18.16.0 used)
- Clone the repo:
  ```sh
  $ git clone https://github.com/MidoAhmed/mock-api-explorer.git
  $ cd mock-api-explorer
  ```

### Explore tools

1. Mirage JS

   ```sh
   $ git checkout miragejs
   $ npm install
   $ npm test # run tests with jest to test the miragejs mock api server

   ```

2. MSW

   ```sh
   $ git checkout msw
   $ npm install
   $ npm test # run tests with jest to test the MSW mock api server

   ```

### Comparison

| Criteria      | MirageJS |            MSW |    json-server | Nock | Fetch-mock | Superagent |
| :------------ | :------: | -------------: | -------------: | ---- | ---------- | ---------- |
| Supported API |   REST   | REST / GraphQL |           REST | REST |            |            |
| Environments  | Browser  | Node / Browser | Node / Browser | Node |            |            |
| Integration   |          |                |                |      |            |            |
| Definition    |          |                |                |      |            |            |
