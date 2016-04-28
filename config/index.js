/**
 * Created by Zhang Mingze on 2016/3/29.
 */

module.exports = { 
  PORT: 3000,

  // mongo数据库配置
  mongo: {
    cookieSecret: 'mblog', 
    db: 'mblog', 
    host: '127.0.0.1',
    port: 27017
  },
  
  // 邮箱配置
  MAIL_OPTS: {
      host: 'smtp.126.com',
      port: 25,
      auth: {
          user: 'it_coolfish@126.com',
          pass: '789512357',
          name: '张铭泽'
      }
  },

  // 管理员账号
  admin: {
    name: 'admin',
    pwd: 'aaa',
    head: "/img/header.png"
  }
};