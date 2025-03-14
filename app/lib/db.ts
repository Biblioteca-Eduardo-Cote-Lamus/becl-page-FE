import mysql from 'mysql2/promise';

// Define a more specific base type for database values
export type DatabaseValue = string | number | boolean | Date | Buffer | null;

// Define types for query results
export type QueryResult = {
  [key: string]: DatabaseValue;
}[];

export type QueryResultRow = {
  [key: string]: DatabaseValue;
};

// Define database error type
interface DatabaseError extends Error {
  code?: string;
  sqlMessage?: string;
  sql?: string;
  sqlState?: string;
  errno?: number;
}

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '1234',
  database: process.env.MYSQL_DATABASE || 'biblioteca_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection and database existence
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database:', connection.config.database);
    
    // Test if we can access the database
    const [rows] = await connection.execute('SHOW TABLES');
    console.log('Available tables:', rows);
    
    connection.release();
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error('Database connection error:', {
      message: dbError.message,
      code: dbError.code,
      sqlMessage: dbError.sqlMessage
    });
    throw dbError;
  }
}

// Call testConnection in development
if (process.env.NODE_ENV === 'development') {
  testConnection().catch(console.error);
}

export async function executeQuery<T>(
  query: string, 
  values: Array<DatabaseValue> = []
): Promise<T> {
  try {
    const [results] = await pool.execute(query, values);
    return results as T;
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error('Database Error:', {
      message: dbError.message,
      code: dbError.code,
      sqlMessage: dbError.sqlMessage,
      sql: dbError.sql
    });

    // Handle common database errors gracefully during development
    if (process.env.NODE_ENV === 'development') {
      switch (dbError.code) {
        case 'ER_BAD_DB_ERROR':
          throw new Error('Database does not exist. Please check your database configuration.');
        case 'ER_NO_SUCH_TABLE':
          throw new Error('Table does not exist. Please run the database setup script.');
        case 'ER_BAD_FIELD_ERROR':
          throw new Error('Invalid column name. Please check your query.');
        default:
          throw new Error(dbError.message || 'An unexpected database error occurred.');
      }
    }

    throw new Error(dbError.message || 'Database Error');
  }
} 