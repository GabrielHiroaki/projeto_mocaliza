const { Sequelize } = require('sequelize');

class Database {
    static instance;

    constructor(dialect, databaseName) {
        this._sequelize = new Sequelize({
            dialect,
            storage: databaseName
        });
    }

    static getInstance() {
        if (Database.instance == undefined) {
            Database.instance = new Database(
                'sqlite',
                'mocaliza_db.db'
            );
        }

        return Database.instance;
    }

    get sequelize() {
        return this._sequelize;
    }

	async sync() {
		try {
			await this._sequelize.sync({ force: true });
			console.log("Conexão com o banco de dados estabelecida com sucesso.");
		} catch (error) {
			console.error('Não foi possível conectar ao banco de dados:', error);
		}
	}
}

module.exports = { Database };
