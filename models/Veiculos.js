const db = require('./db');

//criando a tabela veiculos

const Veiculo = db.sequelize.define('veiculos',{
    marca: {
        type: db.Sequelize.STRING
    },
    modelo: {
        type: db.Sequelize.STRING
    },
    anoFabricacao: {
        type: db.Sequelize.INTEGER
    },
    placa: {
        type: db.Sequelize.STRING
    }
});

Veiculo.sync({force: false});

module.exports = Veiculo;
