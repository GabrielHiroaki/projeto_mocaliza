const express = require('express');
const path = require('path'); 

const { Database } = require('./configs/sequelize');
const { CategoryController } = require('./controllers/category-controller.js');
const { MarcaController } = require('./controllers/marca-controller.js');

const db = Database.getInstance();
const app = express();
const categoryController = new CategoryController();
const marcaController = new MarcaController();

app.use('/src/public', express.static(path.join(__dirname, 'public')));

// Middleware para analisar JSON
app.use(express.json());

// Middleware para analisar URL-encoded bodies (importante para formulários HTML)
app.use(express.urlencoded({ extended: true })); 

app.use(express.static('public'));

app.get('/api/categories', async (req, res) => {
	const categories = await categoryController.index();

	res.json({
		data: categories
	});
});

app.get('/api/categories/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const category = await categoryController.show(id);

	res.json({
		data: category,
	});
});

app.post('/api/categories', async (req, res) => {
	const categoryDto = {
		name: req.body.name,
		active: true,
	};

	const category = await categoryController.store(categoryDto);

	res.status(201);
	res.json({
		data: category
	});
});

app.delete('/api/categories/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const category = await categoryController.show(id);
	
	if (!category) {
			return res.status(404).json({ error: 'Categoria não encontrada' });
	}

	try {
			await categoryController.destroy(id);
			res.status(204).end();
	} catch (e) {
			res.status(500).json({ error: e.message });
	}
});

app.put('/api/categories/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const categoryDto = {
			name: req.body.name,
			active: req.body.active !== undefined ? req.body.active : true,
	};

	try {
			const category = await categoryController.update(id, categoryDto);
			res.json({ data: category });
	} catch (e) {
			res.status(404).json({ error: 'Categoria não encontrada ou atualização falhou: ' + e.message });
	}
});

// Rotas para Marca
app.get('/api/marcas', async (req, res) => {
	const marcas = await marcaController.index();
	res.json({ data: marcas });
});

app.get('/api/marcas/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const marca = await marcaController.show(id);
	res.json({ data: marca });
});

app.post('/api/marcas', async (req, res) => {
	const marcaDto = {
		name: req.body.name,
		active: true,
	};

	const marca = await marcaController.store(marcaDto);
	res.status(201).json({ data: marca });
});

app.put('/api/marcas/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const marcaDto = {
		name: req.body.name,
		active: req.body.active !== undefined ? req.body.active : true,
	};

	try {
		const marca = await marcaController.update(id, marcaDto);
		res.json({ data: marca });
	} catch (e) {
		res.status(404).json({ error: 'Marca não encontrada ou atualização falhou: ' + e.message });
	}
});

app.delete('/api/marcas/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const marca = await marcaController.show(id);
	
	if (!marca) {
			return res.status(404).json({ error: 'Marca não encontrada' });
	}

	try {
			await marcaController.destroy(id);
			res.status(204).end();
	} catch (e) {
			res.status(500).json({ error: e.message });
	}
});


app.listen(8000, async () => {
	//db.sync();
	console.log('Server foi inicializado com a porta 8000');
});
