module.exports = {
  apps: [
    {
      name: 'admin-dashboard',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 7000',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
