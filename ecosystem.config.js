module.exports = {
  apps: [{
    name: 'nextjs-dashboard',
    script: '.next/standalone/server.js',
    env: {
      PORT: 3000,
      NODE_ENV: 'production'
    }
  }]
}
