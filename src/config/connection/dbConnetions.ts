import dotenV from "dotenv";
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";


dotenV.config({path: "variables.env"});

const portDB = Number(process.env.PORT);
const datbd= String (process.env.DATABASE);
const hostDB= String (process.env.HOST);
const Userdb= String (process.env.USER_DB);
const passDB= String (process.env.USER_PASSWORD);

const pgp=pgPromise(optionsPG);
const pool= pgp({
    user:Userdb,
    password: passDB,
    database: datbd,
    host: hostDB,
    port: portDB 
});


pool.connect().then((miconn)=>{
    console.log("Conectado a" + datbd);
    miconn.done();
}).catch(/*funcion flecha anonima lambda**/(/**Aqui van los parametros*/miError)=>{
    console.log(miError);
});

export default pool;