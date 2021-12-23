import path from 'path';
import { Sequelize } from 'sequelize';
import { Product } from './models/Product';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
});

Product.initialize(sequelize);

export default sequelize;
