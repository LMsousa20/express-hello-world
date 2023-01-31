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
const multer = require('multer')
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());


app.get("/", (req, res) => res.type('html').send({console.log("entrou")}));

app.get('/users', async (req, res) => {
  try {
      const repUsers = await pool.query(`SELECT * FROM empresas`)
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


const storageBanner = multer.diskStorage({
  destination: (req, file, cb)=>{
      cb(null, `./imgDoBanner/`)
  },
  filename: (req, file, cb)=>{
      cb(null, 'imgDoBanner'+ String(Math.round(Math.random() *10000)) +'.jpg')

  }
})

const uploadBanner = multer({
  storage: storageBanner
})

app.use('/banner', express.static('banner'))
app.post('/banner', uploadBanner.single('banner_imagem') ,async (req, res) => {
  const pedido = {
      nome: req.body.nome,
      description: req.body.description,
      urlimagem: req.file.filename,
      url: req.file.path
  }
  res.status(201).send({
      mensagem: 'O pedido foi criado',
      pedidoCriado: pedido
      
  })
  await pool.query(`UPDATE empresas SET urlbanner1=${pedido.url} where razao='CEARA' `)
})git 

app.get('/funcionario/:idfunc', async (req, res) => {
  var func = req.params.idfunc;
  console.log(func)
  console.log(typeof func)

  try {
      const retorno = await pool.query(`SELECT * FROM funcionario WHERE id_funcionario='${func}'`)
      var reposta = res.status(200).send(retorno.rows)

      return reposta
  }
  catch (err) {
      return res.status(400).send(err)
  }
})

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));


