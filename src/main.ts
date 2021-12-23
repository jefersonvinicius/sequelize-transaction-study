import { Product } from './models/Product';
import sequelize from './sequelize';
import faker from 'faker';
import { argv } from 'process';

async function main() {
  const withError = argv.find((arg) => arg === '--withError');

  await sequelize.sync();

  const transaction = await sequelize.transaction();
  try {
    const name = faker.commerce.productName();

    console.log(`Creating product with name "${name}"`);
    const product = await Product.create(
      {
        name: name,
        price: faker.datatype.number({ min: 100, max: 1000, precision: 2 }),
      },
      { transaction }
    );

    const newName = withError ? null : faker.commerce.productName();
    console.log(`Updating product to name "${newName}"`);

    await product.update(
      {
        name: newName!,
      },
      { transaction }
    );

    await transaction.commit();

    console.log('All changes saved!!');
  } catch (error) {
    console.log('Error, rolling back...');
    await transaction.rollback();
  }
}

main();
