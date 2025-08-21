const { execSync } = require('child_process');

try {
  // Build database package
  console.log('Building database package...');
  execSync('cd ../../packages/database && yarn install && yarn build', { stdio: 'inherit' });

  // Build nest-js package
  console.log('Building nest-js package...');
  execSync('cd ../../packages/nest-js && yarn install && yarn build', { stdio: 'inherit' });

  // Build auth service
  console.log('Building auth service...');
  execSync('yarn install && yarn build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
