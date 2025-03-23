import { rmSync } from 'fs';

try {
  rmSync('./README.md');
  console.log('✅ Template initialized!');
} catch (error) {
  console.error('❌ Error during postinstall:', error);
}
