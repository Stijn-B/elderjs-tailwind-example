const path = require('node:path');
const del = require('del');

(async () => {
  const { getConfig } = await import('@elderjs/elderjs');
  const { distDir } = await getConfig();
  console.log('Clearing out public folder.');
  del.sync(path.join(distDir, '*'));
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
