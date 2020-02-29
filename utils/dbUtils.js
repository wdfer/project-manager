import { commonUtils } from './utils';
import { dbConfig } from '/config/baseConfig'
import mysql from 'mysql';

const {isEmpty, isNotEmpty} = commonUtils;

const connectionLimit = 10;
const queryTimeout = 40*1000;

let connectPool = null;

const createConnectPool = ()=>{
    connectPool = mysql.createPool({
        connectionLimit,
        ...dbConfig
    });
};

const getConnect = (func)=>{
    if(isEmpty(connectPool)){
        createConnectPool();
    }
    connectPool.getConnection((err, conn)=>{
        if(err){
            console.log('获取连接出错--'+err.stack);
        }
        func(conn);
    });
};

const handleSqlWithTrans = (sql, values=[], func)=>{
    getConnect(conn=>{
        conn.beginTransaction(err=>{
            if(err){
                console.log('事务开启出错--'+err.stack);
            }
            conn.query({
                sql,
                timeout: queryTimeout,
                values: values
            },(error, results, fields)=>{
                if(error){
                    return conn.rollback(()=>{
                        console.log('sql查询出错--'+error.stack)
                    });
                }
                conn.commit((error) => {
                    if(error) {
                        console.log('事务提交失败--'+error.stack)
                    }
                });
                conn.release();
                func(results, fields);
            });
        });
    })
};

const handleSql = (sql, values=[], func)=>{
    getConnect(conn=>{
        conn.query({
            sql,
            timeout: queryTimeout,
            values: values
        },(error, results, fields)=>{
            if(error){
                console.log('sql查询出错--'+error.stack)
            }
            conn.release();
            func(results, fields);
        });
    });
};

const closeConnection = ()=>{
    if(isNotEmpty(connectPool)){
        connectPool.end(function (err) {
            if(err){
                console.log('关闭所有连接出错--'+err.stack);
            }
        });
    }
};

const dbUtils = {
    getConnect,
    handleSqlWithTrans,
    handleSql,
};

dbUtils.save = (table, values, func)=>{
    handleSqlWithTrans(`INSERT INTO ${table} SET ?`, values, func);
};

dbUtils.update = (sql, values, func)=>{
    handleSqlWithTrans(sql, values, func);
};

dbUtils.delete = (sql, values, func)=>{
    handleSqlWithTrans(sql, values, func);
};

dbUtils.query = (sql, values, func)=>{
    handleSql(sql, values, func);
};

/*

getConnect((conn, ...rest)=>{
        conn.beginTransaction(err=>{
            if(err){
                console.log('事务开启出错--'+err.stack);
            }

        });
    }, ...rest);



const getConnect = function(){
    if(isEmpty(connectPool)){
        const connect = mysql.createConnection(dbConfig);
        connectPool.push(connect);
    }
    return connectPool[0];
};

const closeConnect = ()=>{
    if(isNotEmpty(connectPool)){
        connectPool.forEach(d=>{
            d.end && d.end(err=>{
                if(err){
                    console.log('关闭数据库连接发生错误'+err);
                }
            });
        });
    }
};*/


export default dbUtils;