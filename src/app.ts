
import express from 'express';
import 'reflect-metadata';
import { createConnection, getRepository, ConnectionOptions } from 'typeorm';
import { Category } from './entities/Category';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
const port = 5000;

const connectionOptions: ConnectionOptions = {
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

createConnection(connectionOptions)
  .then(async (connection) => {
    console.log('Database Connected Successfully;');

    const categoryRepository = getRepository(Category);

    app.get('/categories', async (_, res) => {
      try {
        const allCategories = await categoryRepository.find();
        res.json(allCategories);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    
    app.post('/categories', async (req, res) => {
      try {
        const { name, images, price, unit, is_active } = req.body;

        const category = new Category();
        category.name = name;
        category.images = images;
        category.price = price;
        category.unit = unit;
        category.is_active = is_active;

        const savedCategory = await categoryRepository.save(category);
        res.json(savedCategory);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    
    app.put('/categories/:id', async (req, res) => {
      try {
        const categoryId: number = parseInt(req.params.id, 10);
        const { name, images, price, unit, is_active } = req.body;

        let category = await categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }

        category.name = name;
        category.images = images;
        category.price = price;
        category.unit = unit;
        category.is_active = is_active;

        const updatedCategory = await categoryRepository.save(category);
        res.json(updatedCategory);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    
    app.delete('/categories/:id', async (req, res) => {
      try {
        const categoryId: number = parseInt(req.params.id, 10);

        const category = await categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }

        await categoryRepository.remove(category);
        res.json({ message: 'Category deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    app.get('/', (_, res) => {
      res.send('Welcome to the API! Available routes: /categories');
    });

    app.listen(port, () => {
      console.log(`Server Running on Port: http://localhost:${port}`);
    });
  })
  .catch((err) => console.log('Error Connecting Database', err));

export default connectionOptions;
