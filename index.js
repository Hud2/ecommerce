const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUTOS_QUERY = 'SELECT * FROM produtos';
const SELECT_PRODUTO_QUERY = 'SELECT * FROM produtos WHERE idProduto = ?';
const DELETE_PRODUTO_QUERY = 'DELETE FROM produtos WHERE idProduto = ?';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adm9210',
    database: 'produtodb'
})

app.use(cors());

app.get('/', (req, res) => {
    res.send('DEU BOA')
});

//Adiciona produto
app.get('/produtos/add', (req, res) => {
    const { nome, preco } =req.query;
    const INSERT_PRODUTO_QUERY = `INSERT INTO produtos (nome, preco) VALUES('${nome}', ${preco})`;
    connection.query(INSERT_PRODUTO_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('Produto adicionado com sucesso.')
        }
    });
});

//GET todos os produtos
app.get('/produtos', (req, res) => {
    connection.query(SELECT_ALL_PRODUTOS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results    
            })
        }
    });
});

// GET: lista produto expecifico
app.get('/produtos/:id', (req, res) => {
    connection.query(SELECT_PRODUTO_QUERY, [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// DELETE: deleta produto expecifico
app.delete('/produtos/del/:id', (req, res) => {
    mysqlConnection.query(DELETE_PRODUTO_QUERY, [req.params.id], (err, rows, fields) => {
        
        if (!err)
            res.send('Produto deletado com sucesso!');
        else
            console.log(err);
    })
});



app.listen(4000, () => {
    console.log(`Servidor de produtos funcionando na porta 4000`)
})