import pool from '../config/db.js' ;

export async function createManager(email , hashedPassword , name , phn ){
    const result = await pool.query(
        `insert into manager_auth (email , pass , name , phn) values (? , ? , ? , ?)`, [email,hashedPassword,name,phn]
    )
    return result ;
}

export async function findManagerByEmail(email){
    const rows = await pool.query(
        `SELEcT id, email, pass, name, phn FROM manager_auth WHERE email = ?`,[email]
    )
    return rows[0];
}

export async function findManagerById(id){
    const rows = await pool.query(
        `SELECT id, email, name, phn FROM manager_auth where id = ? `, [id]
    )
    return rows[0]
}