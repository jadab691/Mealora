import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { createManager, findManagerByEmail } from '../models/Manager.js'
import {JWT_SECRET} from '../config/env.js'


export async function registerManager(req, res){
    try{
        const {email, pass , name , phn} = req.body ;

        const existManager = await findManagerByEmail(email) ;

        if(existManager){
            return res.status(409).json({
                success: false , 
                message: "User already exists ...."
            })
        }

        const hashedPass = await bcrypt.hash(pass , 10) ;

        await createManager( // manager creation er function imported from models folder .
            email, hashedPass, name, phn
        )

        res.status(201).json({
            success: true,
            message: "User created succesfully"
        })


    }catch(err){
        console.error(err)

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export async function loginManager(req, res){
    try{

        const {email,pass} = req.body ;
        const Manager = await findManagerByEmail(email) ;

        if(!Manager){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        
        const passMatch = await bcrypt.compare(
            pass, 
            Manager.pass
        )

        if(!passMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }   

        const token = jwt.sign(
            {
                id : Manager.id , 
                email: Manager.email
            },
            JWT_SECRET,
            {
                expiresIn:'7d'
            }
        )

        res.status(200).json({
            success: true , 
            message: "Login successfull...",
            token , 
            manager: {
                id : Manager.id,
                name: Manager.name,
                email: Manager.email,
                phn: Manager.phn
            }
        });





        



    }catch(err){
        console.error(err) ;
        res.status(500).json({
            success: false,
            message: "server error......"
        })
    }
}