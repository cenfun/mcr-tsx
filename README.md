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
cross-env NODE_OPTIONS="--import tsx --no-warnings" npx mcr tsx ./src/example.ts
```

- Mocha Test Runner
```sh
cross-env NODE_OPTIONS="--import tsx --no-warnings" npx mcr mocha ./test/**/*.ts
```

## Resolve the source for `.ts`
When collecting coverage data for the `.ts` file, we can also get the sourcemap from [`source-map-cache`](https://nodejs.org/docs/latest/api/cli.html#source-map-cache), but we can't get the runtime source code, instead, what we get is `lineLengths`, which can only generate a fake source, but it cannot be parsed into an AST. Therefore, we need to compile the source for these ts files with `tsx`.
```js
const coverageOptions = {
    onEntry: (entry) => {

        // get the source for fake entry from tsx cache
        if (entry.fake && entry.sourceMap) {
            getRealSourceFromCache(entry);
        }

    }
}
```
see [mcr.config.ts](mcr.config.ts)
