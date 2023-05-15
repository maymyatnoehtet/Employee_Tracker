// Import the modules require
const express = require('express');
const inquirer = require('inquirer');
const db_password = require('./password.json');
const mysql = require('mysql2');

// Defining an array of question objects for user prompt
const question = [ 
    {
        type: 'list',
        name: 'todo',
        message: 'What is the title of your project?',
        choices: ["view all departments", "view all roles", "view all employees", "add a department",
                  "add a role", "add an employee", "update an employee role"]
    }]

// Asking the user the question(s) defined in the 'question' array
inquirer
    .prompt(question)
    .then(answer => console.log(answer));

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: db_password.password,
        database: 'company_db'
    },
    console.log("Connected to the company_db database")
);