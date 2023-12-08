// MarcaController.js
const { Marca } = require('../models/marca');

class MarcaController {
    async index() {
        return await Marca.findAll();
    }

    async show(id) {
        return await Marca.findByPk(id);
    }

    async store(marcaDto) {
        return await Marca.create(marcaDto);
    }

    async update(id, marcaDto) {
        const marca = await Marca.findByPk(id);
        if (!marca) {
            throw new Error("Marca not found!");
        }
        marca.name = marcaDto.name;
        marca.active = marcaDto.active !== undefined ? marcaDto.active : marca.active;
        await marca.save();
        return marca;
    }

    async destroy(id) {
        const marca = await Marca.findByPk(id);
        if (!marca) {
            throw new Error("Marca not found!");
        }
        await marca.destroy();
        return { message: "Marca deleted successfully" };
    }
}

module.exports = { MarcaController };
