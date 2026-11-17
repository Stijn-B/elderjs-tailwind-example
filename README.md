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

### 4.3 Running the example

Use Node.js 22.12 or newer. Run `npm ci` and then `npm run dev` to start Elder’s development server and the Tailwind watcher. The bundled Elder.js compiler watches Svelte source changes.

Run `npm run build` to clean the output, generate the static pages and build the production CSS. The generated site is written to `public/`. Run `npm run serve` to build and start the example’s production SSR server.

## 5. Import the generated `tailwind.css`
Import the generated `tailwind.css` file in your layout `src/layouts/Layout.svelte`.

```html
<svelte:head>
  ...
  <link href="/tailwind.css" rel="stylesheet" />
</svelte:head>
```
