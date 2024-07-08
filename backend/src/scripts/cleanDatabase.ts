import pool from '../config/db';

const cleanDatabase = async () => {
  try {
    console.log('Cleaning the database...');
    
    await pool.query('TRUNCATE TABLE teams, squads, leagues RESTART IDENTITY CASCADE');
    
    console.log('Database cleaned successfully.');
  } catch (error) {
    console.error('Error cleaning the database:', error);
  } finally {
    pool.end();
  }
};

cleanDatabase();
