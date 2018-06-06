module.exports = {
  apps : [
    {
      name      : 'mrWorldWideAdmin',
      script    : './prodServer.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production : {
        watch: false,
        NODE_ENV: 'production',
        API_BASE_URL: 'http://200.16.7.150:8083/api/v1',
        WP_BASE_HREF: '/'
      }
    },
  ]
};