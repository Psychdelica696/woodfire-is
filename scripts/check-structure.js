// Перевіряє, що в репозиторії є обов'язкові файли та каталоги.
import { existsSync } from 'node:fs';

const required = ['README.md', '.gitignore', 'package.json', 'docs', 'src', 'tests'];
const missing = required.filter((p) => !existsSync(p));

if (missing.length) {
  console.error('Відсутні обов\'язкові елементи:', missing.join(', '));
  process.exit(1);
}
console.log('Структура репозиторію коректна:', required.join(', '));
