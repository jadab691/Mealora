import mariadb from 'mariadb';

import {
    DB_HOST,
    DB_PORT, 
    DB_USER, 
    DB_PASSWORD, 
    DB_NAME
} from './env.js'

const pool = mariadb.createPool({
    host : DB_HOST,
    port : DB_PORT,
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_NAME
});

export default pool ;

export async function testConnection (){
    let connection ; 

    try{
        connection = await pool.getConnection() ;
        console.log("Mariadb connection succesfullllll.....")
    }catch(err){
        console.log("mariadb connection failed.." , err.message) ; 
        throw err ;
    }finally{
        if(connection){
            connection.release() ;
        }
    }
}


