const express2 = require('express')
const app = express2()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const pool = mysql.createPool(config)

app.get('/', (req, res) => {
    const sqlInsert = `INSERT INTO people(name) values('Paulo Enrique')`
    const sqlSelect = `SELECT * FROM people ORDER BY id DESC LIMIT 1`

    pool.query(sqlInsert, (err, insertResult) => {
        if (err) throw err;

        pool.query(sqlSelect, (err, selectResult) => {
            if (err) throw err;
            res.send(`<h1>FullCycle</h1><br><h1>Último registro: ${selectResult[0].name}</h1>`)
        })
    })
})

app.listen(port, () => {
    console.log('CONSEGUI RODAR NA PORTA' + port)
})