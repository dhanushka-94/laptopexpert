const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the SQL files
const readSqlFile = (filename) => {
  return fs.readFileSync(path.join(__dirname, filename), 'utf8');
};

async function setupDatabase() {
  let connection;

  try {
    // Create connection without specifying database (to create it if needed)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
      multipleStatements: true // Enable multiple statements for schema execution
    });
    
    console.log('Connected to MySQL server');
    
    // Read schema and seed SQL files
    const schemaSql = readSqlFile('schema.sql');
    const seedSql = readSqlFile('seed.sql');
    
    // Execute schema SQL (creates database and tables)
    console.log('Creating database and tables...');
    await connection.query(schemaSql);
    console.log('Database schema created successfully');
    
    // Execute seed SQL (populates tables with data)
    console.log('Populating database with sample data...');
    await connection.query(seedSql);
    console.log('Database seeded successfully');
    
    console.log('Database setup completed successfully!');
    
  } catch (error) {
    console.error('Database setup failed:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the setup
setupDatabase(); 