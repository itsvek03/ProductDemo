require('dotenv').config();

module.exports = {
  development: {
    database: 'PRODUCTDB',
    use_env_variable: 'DB_DEV_URL',
    dialect: 'postgres'
  },

  test: {
    database: 'PRODUCTDB',
    use_env_variables: 'DB_TEST_URL',
    dialect: 'postgres'
  },

  production: {
    database: 'PRODUCTDB',
    use_env_variables: 'DB_PROD_URL',
    dialect: 'postgres'
  }
}