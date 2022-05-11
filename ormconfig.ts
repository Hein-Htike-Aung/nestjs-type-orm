import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  // database: '../db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  // logging: true
};

export default config;
