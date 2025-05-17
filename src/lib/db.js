import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to execute SQL queries
export async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper functions for common database operations

// Get all records from a table
export async function getAll(table, limit = 100, offset = 0) {
  return query({
    query: `SELECT * FROM ${table} LIMIT ? OFFSET ?`,
    values: [limit, offset]
  });
}

// Get a single record by ID
export async function getById(table, id) {
  const results = await query({
    query: `SELECT * FROM ${table} WHERE id = ?`,
    values: [id]
  });
  return results[0];
}

// Get records by a field value
export async function getByField(table, field, value) {
  return query({
    query: `SELECT * FROM ${table} WHERE ${field} = ?`,
    values: [value]
  });
}

// Insert a new record
export async function insert(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');

  const result = await query({
    query: `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`,
    values
  });

  return {
    id: result.insertId,
    ...data
  };
}

// Update a record
export async function update(table, id, data) {
  const entries = Object.entries(data);
  const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
  const values = [...entries.map(([_, value]) => value), id];

  await query({
    query: `UPDATE ${table} SET ${setClause} WHERE id = ?`,
    values
  });

  return {
    id,
    ...data
  };
}

// Delete a record
export async function remove(table, id) {
  return query({
    query: `DELETE FROM ${table} WHERE id = ?`,
    values: [id]
  });
}

export default pool; 