// CategoryController.js
const { Category } = require('../models/category');

class CategoryController {
    async index() {
        return await Category.findAll();
    }

    async show(id) {
        return await Category.findByPk(id);
    }

    async store(categoryDto) {
        return await Category.create(categoryDto);
    }

    async update(id, categoryDto) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error("Category not found!");
        }
        category.name = categoryDto.name;
        category.active = categoryDto.active !== undefined ? categoryDto.active : category.active;
        await category.save();
        return category;
    }

    async destroy(id) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error("Category not found!");
        }
        await category.destroy();
        return { message: "Category deleted successfully" };
    }
}

module.exports = { CategoryController };