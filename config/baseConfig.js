const baseUrl = process.cwd(),
    basePackage = 'public';

const dbConfig = {
    host:'localhost',
    database: 'promanager',
    user:'root',  //用户名
    password:'123456',   //密码
    port:'3306'
};


export { baseUrl, basePackage, dbConfig };