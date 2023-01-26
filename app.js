const express = require("express");
const app = express();
const cors = require('cors');
const { Pool } = require('pg')
const PORT = process.env.PORT || 3001;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
})
app.use(cors())
app.use(express.json())
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());


app.get("/", (req, res) => res.type('html').send(rows));

app.get('/users', async (req, res) => {
  try {
      const repUsers = await pool.query(`SELECT * FROM clientes`)
      return res.status(200).send(repUsers.rows)
  }
  catch (err) {
      return res.status(400).send(err)
  }
})

app.get('/users/:idclient', async (req, res) => {
  var client = req.params.idclient;
  console.log(client)
  console.log(typeof client)

  try {
      const retorno = await pool.query(`SELECT * FROM clientes WHERE cpf='${client}'`)
      var reposta = res.status(200).send(retorno.rows)

      return reposta
  }
  catch (err) {
      return res.status(400).send(err)
  }
})

app.get('/products', async (req, res) => {
  try {
      const repProdutos = await pool.query(`SELECT * FROM cad_produtos`)
      return res.status(200).send(repProdutos.rows)
  }
  catch (err) {
      return res.status(400).send(err)
  }
})

app.post('/cadprodutos', async (req, res)=>{
const cad= {
  nome: req.body.nome,
  descricao: req.body.descricao,
  valor: req.body.valor
}
console.log(cad)
try {
  await pool.query(`INSERT INTO cad_produtos (name, description, value_xpc)
  VALUES('${cad.nome}', '${cad.descricao}', ${cad.valor});`)

   return res.status(201).send({
    mensagem: "produto cadastrado com sucesso",
    produto: cad
   })
}
catch (err) {

  return res.status(400).send(err)
}

})



app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));


