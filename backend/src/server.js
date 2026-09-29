import app from './app.js'

import {PORT} from './config/env.js'
import {testConnection} from './config/db.js'

async function startServer(){
    try{
        await testConnection();

        app.listen(PORT , ()=>{
            console.log(`server running on port : ${PORT}`)
        })

    }catch(err){
            console.log("server failed to start ....." , err.message) ;
            process.exit(1) ; // db connection or server  off koira dewa , jodi connection e fail hoy something . 
        // process.exit(0) means operation is succesfull , now comfortably shut down the process .  
    }
}

startServer() ; 