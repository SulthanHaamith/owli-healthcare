module.exports = {
  apps: [
    {
      name: "owli-healthcare",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/var/www/owli-healthcare",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
