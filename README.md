# Elder.js with TailwindCSS

This tutorial has a corresponding [Github repository](https://github.com/Stijn-B/elderjs-tailwind). It's [commits](https://github.com/Stijn-B/elderjs-tailwind/commits/main) correspond with the steps of this tutorial.


## 1. Install TailwindCSS

TailwindCSS is only needed as a developer dependency so a `-D` arg is added to the `npm install` command.

```shell
npm install -D tailwindcss
npx tailwindcss init
```

PostCSS is also required but already installed if you started your ElderJS project from the [official template](https://github.com/Elderjs/template). Otherwise you should add it with `npm install -D postcss`

## 2. Setup Configurations

### 2.1 PostCSS Configuration


Create a PostCSS config file `postcss.config.cjs`

```shell
code postcss.config.cjs
```

Add the following settings to the PostCSS config file:

```cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 2.2 TailwindCSS Configuration

Update the `tailwind.config.js` file created in step 1 to look like this:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{svelte,html,js,ts}"],
  theme: {},
  plugins: [],
};
```

## 3. Create a TailwindCSS source file

Create a `src/tailwind.css` file:

```shell
code src/tailwind.css
```

And add the [TailwindCSS directives](https://tailwindcss.com/docs/functions-and-directives#directives):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 4. Expand `start` and `build` build scripts

### 4.1 Add `npm-run-all`
Install `npm-run-all` as a developer dependency with:


```shell
npm install -D npm-run-all
```

### 4.2 Add Tailwind scripts

Add the following Tailwind scripts to your `package.json`:

```json
{
  "scripts": {
    "watch:tailwind": "tailwindcss -c ./tailwind.config.js -i ./src/tailwind.css -o ./public/tailwind.css --postcss ./postcss.config.cjs  --watch",
    "build:tailwind": "tailwindcss -c ./tailwind.config.js -i ./src/tailwind.css -o ./public/tailwind.css --minify  --postcss ./postcss.config.cjs ",
  }
}
```

**note**: The default Elderjs output folder is `/public`. If you changed this in the Elderjs settings (`elderjs.config.js` -> `distdir`) you should update the `-o` output paths of the tailwind scripts accordingly.

For more information about the `tailwindcss` command, run `npx tailwindcss -h` in a terminal.

### 4.3 Updating the `start` script

In `package.json` replace the existing `dev` script with the following 2 scripts:

```json
{
  "scripts": {
    "dev": "run-p watch:rollup watch:tailwind",
    "watch:rollup": "rollup -c -w --no-watch.clearScreen",
  }
}
```

**explanation**: The `start` script just runs the `dev` script. The current `dev` script will have to run in parallel with the new `watch:tailwind` script. To achieve this the current `dev` script is moved to a new `watch:rollup` script and then replaced with a script that runs both `watch:rollup` and `watch:tailwind` in parallel.

### 4.4 Updating the `build` script

In `package.json` replace the existing `build` script with the following 2 scripts:

```json
{
  "scripts": {
    "clean": "node ./src/cleanPublic.js",
    "build": "run-s clean build:**",
  }
}
```

**explanation**: For readability the `clean` script was extracted from the `build` script. The `build` script now runs the `clean` and then all `build:` scripts sequentially. It's enough to specify only  `build:**` because `run-s` can work with [glob-like pattern matching](https://github.com/mysticatea/npm-run-all/blob/master/docs/run-s.md#glob-like-pattern-matching-for-script-names).




## 5. Import the generated `tailwind.css`
Import the generated `tailwind.css` file in your layout `src/layouts/Layout.svelte`.

```html
<svelte:head>
  ...
  <link href="/tailwind.css" rel="stylesheet" />
</svelte:head>
```
