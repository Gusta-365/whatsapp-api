
const express = require('express');
const conexion = require('../bd/conexion');
const router = express.Router();
var mysql = require('mysql');



router.get('/consulta', (req, res) => {
    conexion.query('SELECT * FROM clientes;', (error, resultados) => {
        if (error) return console.error(error.message);

        if (resultados.length > 0) {
            res.json(resultados);
        } else {
            res.send('No hay registros');
        }
    });
});

router.get('/consulta/:id', (req, res) => {
    const { id } = req.params;

    conexion.query(`SELECT * FROM clientes WHERE id=${id};`, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.send('No hay registros');
        }
    });
});

router.post('/insertar', (req, res) => {
    const cliente = {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        estado: req.body.estado,
        fecha: req.body.fecha
    };

    const query = `INSERT INTO clientes SET ?`;

    conexion.query(query, cliente, (error) => {
        if (error) return console.error(error.message);

        res.send(`se inserto correctamente el cliente`);
    });
});

router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;

    const { nombre, telefono, estado, fecha } = req.body;

    const query = `UPDATE clientes SET nombre='${nombre}', telefono='${telefono}', estado='${estado}', fecha='${fecha}' WHERE id='${id}';`;
    conexion.query(query, (error) => {
        if (error) return console.error(error.message);

        res.send(`Se actualizo correctamente el registro ${id}`);
    });
});

router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM clientes WHERE id=${id}`;

    conexion.query(query, (error) => {
        if (error) return console.error(error.message);

        res.send(`Se eliminó correctamente el registro ${id}`);
    });
});

router.get('/envio', (req, res) => {

    respuesta = {

    };
    res.send(respuesta);
    setTimeout(enviomensaje, 2000);

});

function enviomensaje() {
    let date = new Date().toISOString().split('T')[0]
    let consultaEstado = "SELECT * FROM sends WHERE messege='"
    //let query = mysql.format(consultaEstado);
    let query = mysql.format(consultaEstado,[date]);
    conexion.query(query, function (err, result) {
        result.forEach(element => {
            tel = element.phone;
            mensaje = "Buenos días, .";
            console.log(mensaje + " - " + tel);
            const chatId = tel + "@c.us";
            console.log('Primero ' + element.id);
            client.sendMessage(chatId, mensaje);
            console.log("a");
        }
        )

    })
}



module.exports = router