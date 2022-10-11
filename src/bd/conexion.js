const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'whats'
})

connection.connect(
    (err)=>{
        if(!err){
            console.log("Conexion disponible");
        }
        else{
            console.log("Conexion fallida");
        }
    }
)

// connection.query("SELECT * FROM producto",function(err, datosResultado)
// connection.end()
module.exports=connection; 