import {Sequelize} from "sequelize";


const db = new Sequelize('bya0bkte7fucxfk0lidi', 'um2snlxhukab49um', 'MBilsp7EZ2oCHAXGK0FS', {
    host: "bya0bkte7fucxfk0lidi-mysql.services.clever-cloud.com",
   dialect: "mysql"
});   

// const db = new Sequelize('auth_db', 'root', 'Passw0rd', {
//    host: "db",
//    dialect: "mysql"
// });   
  
export default db;

//'freedb_Elmala', 'freedb_administrator', 'x4fHeQ7Z2ADpWu!',
