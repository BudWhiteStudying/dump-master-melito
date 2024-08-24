const PROXY_CONFIG = [{
    context : [
      "/dump-master-melito"
    ],
    target : "http://localhost:8080",
    secure : false,
    logLevel : "debug"/*,
    pathRewrite : {
      "^/(.*)": "/mass-battle-tracker-reboot/$1"
    }*/
  }];

  module.exports = PROXY_CONFIG;
