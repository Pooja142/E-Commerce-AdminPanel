"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Category_1 = require("./entities/Category");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
const port = 5000;
const connectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'ecommerce',
    entities: ["src/entities/*{.ts,.js}"],
    logging: true,
    synchronize: true,
    migrations: ["src/migrations/*.ts"],
};
(0, typeorm_1.createConnection)(connectionOptions)
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database Connected Successfully;');
    const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
    app.get('/categories', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allCategories = yield categoryRepository.find();
            res.json(allCategories);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    app.post('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, images, price, unit, is_active } = req.body;
            const category = new Category_1.Category();
            category.name = name;
            category.images = images;
            category.price = price;
            category.unit = unit;
            category.is_active = is_active;
            const savedCategory = yield categoryRepository.save(category);
            res.json(savedCategory);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    app.put('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categoryId = parseInt(req.params.id, 10);
            const { name, images, price, unit, is_active } = req.body;
            let category = yield categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            category.name = name;
            category.images = images;
            category.price = price;
            category.unit = unit;
            category.is_active = is_active;
            const updatedCategory = yield categoryRepository.save(category);
            res.json(updatedCategory);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    app.delete('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categoryId = parseInt(req.params.id, 10);
            const category = yield categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            yield categoryRepository.remove(category);
            res.json({ message: 'Category deleted successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    app.get('/', (_, res) => {
        res.send('Welcome to the API! Available routes: /categories');
    });
    app.listen(port, () => {
        console.log(`Server Running on Port: http://localhost:${port}`);
    });
}))
    .catch((err) => console.log('Error Connecting Database', err));
exports.default = connectionOptions;
