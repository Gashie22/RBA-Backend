import {Sequelize} from "sequelize";


// const db = new Sequelize('freedb_Elmala', 'freedb_administrator', 'x4fHeQ7Z2ADpWu!', {
   //  host: "sql.freedb.tech",
   // dialect: "mysql"
// });  

const db = new Sequelize('auth_db', 'root', 'Passw0rd', {
   host: "db",
   dialect: "mysql"
});   
  
export default db;

//'freedb_Elmala', 'freedb_administrator', 'x4fHeQ7Z2ADpWu!',