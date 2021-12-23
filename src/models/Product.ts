import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ProductAttrs {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductCreationAttrs extends Optional<ProductAttrs, 'id' | 'createdAt' | 'updatedAt'> {}

export class Product extends Model<ProductAttrs, ProductCreationAttrs> implements ProductAttrs {
  id!: number;
  name!: string;
  price!: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          field: 'created_at',
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at',
        },
      },
      {
        sequelize,
        tableName: 'products',
      }
    );
  }
}
