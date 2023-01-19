const express = require("express");
const app = express();
const cors = require('cors');
const { Pool } = require('pg')
const PORT = process.env.PORT || 3001;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
})
app.use(cors())

app.get("/", (req, res) => res.type('html').send(rows));

app.get('/users', async (req, res) => {
  try {
      const { rows } = await pool.query(`SELECT * FROM cliente`)
      return res.status(200).send(rows)
  }
  catch (err) {
      return res.status(400).send(err)
  }
})

app.get('/users/:idclient', async (req, res) => {
  var client = req.params.idclient;
  console.log(client)
  try {
      const retorno = await pool.query(`SELECT * FROM cliente WHERE cpf_cnpj ="${client}"`)
      var reposta = res.status(200).send(retorno.rows)

      return reposta
  }
  catch (err) {
      return res.status(400).send(err)
  }
})


app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));


