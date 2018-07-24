module.exports = {
  apps : [{
    name      : 'wakanda-hub',
    script    : 'app.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : 'wakanda.local',
      ref  : 'origin/master',
      repo : 'git@github.com:keymetrics/wakanda-hydroplant.git',
      path : '/var/wakanda-hub',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
