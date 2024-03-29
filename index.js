const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Veiculos = require('./models/veiculos');

//carregaando o cabeçalho do html em outras paginas
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//arquivos estaticos

//arquivos estaticos
app.use('/public/img', express.static('public/img'));
app.use('/public/css/bootstrap', express.static('public/css/bootstrap')); // add this line for bootstrap styling

//rota principal
app.get('/', function (req, res) {
    //o then passa os posts para nossa view
    Veiculos.findAll().then(function(veiculos) {
    //var nposts = JSON.parse(JSON.stringify(posts))
    //res.render('home', {posts: nposts})
    veiculos=veiculos.map((veiculos)=>{return veiculos.toJSON()});//res.render('home', {posts: posts})
    res.render('home', {veiculos: veiculos});});
});


//rota principal
app.get('/', function (req, res) {
    //o then passa os posts para nossa view
    Veiculos.findAll().then(function(veiculos) {
    //var nposts = JSON.parse(JSON.stringify(posts))
    //res.render('home', {posts: nposts})
    veiculos=veiculos.map((veiculos)=>{return veiculos.toJSON()});//res.render('home', {posts: posts})
    res.render('home', {veiculos: veiculos});});
});

//rota para cadastro
app.get('/cad', function (req, res) {

    res.render('formulario');
});

//fazendo a inserção no banco de dados
app.post('/add', function (req, res) {
    const { marca, modelo, anoFabricacao, placa } = req.body;
    Veiculos.create({
        marca: marca,
        modelo: modelo,
        anoFabricacao: anoFabricacao,
        placa: placa
    }).then(function () {
        //redirecionado para home com barras
        res.redirect('/');
    }).catch(function (erro) {
        res.send('Houve um erro: ' + erro);
    }); 
});

//excluindo um post

app.get('/deletar/:id', function (req, res) {
    Veiculos.destroy({where: {'id': req.params.id}}).then(function(){
    res.redirect('/');
}).catch(function(erro){
    res.send('Esta veiculo não existe!');
});
});

//rota para alterar
app.get('/alterar/:id', function (req, res) {
    Veiculos.findAll({where: {'id': req.params.id}}).then(function(veiculos){
       //var nposts = JSON.parse(JSON.stringify(posts))
        //res.render('home', {posts: nposts})  
        veiculos=veiculos.map((veiculos)=>{return veiculos.toJSON()});//res.render('home', {posts: posts})    
        res.render('alterar', {veiculos: veiculos});
    }).catch(function(erro){
        res.send('Esta veiculo não existe!');
    });
});

//fazendo a alteração no banco de dados
app.post('/update', function (req, res) {
    Veiculos.update({
       
        marca: req.body.marca,
        modelo: req.body.modelo,
        anoFabricacao: req.body.anoFabricacao,
        placa: req.body.placa
    },
    { where: { 'id': req.body.id } })
    .then(function () {
        res.redirect('/');
    })
    .catch(function (erro) {
        res.send('Essa postagem não existe ' + erro);
    });
});





app.listen(8081, function () {
    console.log('Servidor rodando na url http://localhost:8081');
});