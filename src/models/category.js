// Category.js
const { DataTypes } = require('sequelize');
const { Database } = require('../configs/sequelize');

const Category = Database.getInstance().sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'Categories', 
    timestamps: true 
});

module.exports = { Category };