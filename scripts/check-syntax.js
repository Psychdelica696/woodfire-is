// Перевірка синтаксису всіх JavaScript-файлів проєкту (node --check).
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const roots = ['src', 'tests', 'scripts'];
const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js')) files.push(p);
  }
};
roots.forEach(walk);

let failed = 0;
for (const f of files) {
  const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' });
  if (r.status !== 0) {
    failed++;
    console.error(`✖ ${f}\n${r.stderr}`);
  }
}
if (failed) {
  console.error(`Синтаксичні помилки: ${failed} з ${files.length} файлів`);
  process.exit(1);
}
console.log(`Синтаксис коректний: перевірено ${files.length} файлів`);
