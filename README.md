# mcr-tsx
Monocart Coverage Reports + tsx TypeScript

## Install
```sh
npm i monocart-coverage-reports -D
npm i tsx mocha @types/mocha cross-env -D
```

## Usage

- tsx
```sh
cross-env NODE_OPTIONS="--import tsx" npx mcr tsx ./src/example.ts
```
Node.js v20.6.0 +
```js
npx mcr --import tsx tsx ./src/example.ts
```

- Mocha Test Runner
```sh
cross-env NODE_OPTIONS="--import tsx" npx mcr mocha ./test/**/*.ts
```
Node.js v20.6.0 +
```js
npx mcr --import tsx mocha ./test/**/*.ts
```
