import pool from "../config/db";
//Test the connection to the database
const testConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected:", result.rows[0]);
  } catch (error) {
    console.error("Database connection error:", error);
  }
  try {
    const user = await pool.query("SELECT current_user");
    console.log("User:", user.rows[0].current_user);
  } catch (error) {
    console.error("Failed to get user name:", error);
  }
  try {
    const database = await pool.query("SELECT current_database()");
    console.log("Database:", database.rows[0].current_database);
  } catch (error) {
    console.error("Failed to get database name:", error);
  }
};

testConnection();
