// Marca.js
const { DataTypes } = require('sequelize');
const { Database } = require('../configs/sequelize');

const Marca = Database.getInstance().sequelize.define('Marca', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Adicionando a coluna 'active' para alinhar com o modelo Category
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'Marcas', 
    timestamps: true // Isso manterá as colunas 'createdAt' e 'updatedAt'
});

module.exports = { Marca };
