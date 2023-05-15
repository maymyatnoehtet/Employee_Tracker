-- Delete if there's an existing database named company_db
DROP DATABASE IF EXISTS company_db;

-- Create a company_db database
CREATE DATABASE company_db;

-- Use a company_db database
USE company_db;

-- Create departments table in company_db database
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

-- Create roles table in company_db database
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(100) NOT NULL,
    department_id INT,
    salary INT
);

-- Create employees table in company_db database
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    job_id INT NOT NULL,
    department_id INT NOT NULL,
    salary INT,
    manager_id INT

);

