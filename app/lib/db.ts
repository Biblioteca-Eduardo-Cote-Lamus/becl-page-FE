import mysql from 'mysql2/promise';

// Define a more specific base type for database values
export type DatabaseValue = string | number | boolean | Date | null;

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
  database: process.env.MYSQL_DATABASE || 'nextjs_dashboard',
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
    console.error('Database connection error:', error);
    throw error;
  }
}

// Call testConnection in development
if (process.env.NODE_ENV === 'development') {
  testConnection().catch(console.error);
}

export async function executeQuery<T = QueryResult>(
  query: string, 
  values: Array<DatabaseValue> = []
): Promise<T> {
  try {
    const [results] = await pool.execute(query, values);
    return results as T;
  } catch (error) {
    console.error('Database Error:', error);
    const dbError = error as DatabaseError;
    
    // Handle common database errors gracefully during development
    if (process.env.NODE_ENV === 'development') {
      console.error('Query that failed:', dbError.sql);
      console.error('Error code:', dbError.code);
      console.error('Error message:', dbError.sqlMessage);
      
      switch (dbError.code) {
        case 'ER_BAD_DB_ERROR':
          console.error('Database does not exist. Please create the database and run the setup script.');
          return [] as T;
        case 'ER_NO_SUCH_TABLE':
          console.error('Table does not exist. Please ensure all required tables are created.');
          return [] as T;
        case 'ER_BAD_FIELD_ERROR':
          console.error('Column does not exist. Please check table schema.');
          return [] as T;
        default:
          break;
      }
    }
    
    throw new Error(dbError.message || 'Database Error');
  }
} 