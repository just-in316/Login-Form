require('dotenv').config();
const mysql = require('mysql2/promise');

const setupDatabase = async () => {
    try {
        // First connection to create database if it doesn't exist
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'root',
            port: process.env.DB_PORT || 3306
        });

        console.log('Creating database...');

        // Create database
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'login_database'}`
        );
        console.log(`✓ Database '${process.env.DB_NAME || 'login_database'}' created/exists`);

        // Use the database
        await connection.query(
            `USE ${process.env.DB_NAME || 'login_database'}`
        );

        // Create users table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✓ Users table created/exists');

        // Create sessions table (optional, for token blacklisting)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS sessions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                token VARCHAR(500) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at DATETIME NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('✓ Sessions table created/exists');

        await connection.end();
        console.log('\n✓ Database setup completed successfully!');
    } catch (error) {
        console.error('✗ Database setup failed:', error.message);
        process.exit(1);
    }
};

setupDatabase();
