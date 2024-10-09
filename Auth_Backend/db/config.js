import { Sequelize } from 'sequelize';

// Initialize Sequelize with your connection string
const sequelize = new Sequelize('postgres://postgres:myPostgres@localhost:5432/AuthPractice');

// Function to test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Run the connection test
testConnection();

// Export sequelize directly
export default sequelize;
