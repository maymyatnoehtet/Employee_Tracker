// Import the modules require
const inquirer = require('inquirer');
const db_password = require('./password.json');
const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: db_password.password, // Change to your own password
        database: 'company_db'
    },
    console.log("Connected to the company_db database")
);

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    start();
});

// Function to start the command-line 
function start(){
    // Defining an array of question objects for user prompt
    const question = [ 
        {
            type: 'list',
            name: 'todo',
            message: 'What would you like to do?',
            choices: [
                        "View all departments", 
                        "View all roles", 
                        "View all employees", 
                        "Add a department",
                        "Add a role", 
                        "Add an employee", 
                        "Update an employee role"
                    ]
        }]
    // Asking the user the question(s) defined in the 'question' array
    inquirer
    .prompt(question)
    .then(answer => handle_choice(answer));
}

// Function to handle the user's choice
function handle_choice(choice) {

    switch (choice.todo) {
        case "View all departments":
            viewAllDepartments();
            break;
    
        case "View all roles":
            viewAllRoles();
            break;

        case "View all employees":
            viewAllEmployees();
            break;

        default:
            console.log(choice.todo);
            console.log("Will be available later");
            start();
            break;
    }
}

// Function to view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}

// Function to view all roles
function viewAllRoles() {
    const query = "SELECT * FROM roles";
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}

// Function to view all employees
function viewAllEmployees() {
    const sql_query = `SELECT * FROM Employees`
    db.query(sql_query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // Restart the command-line
        start();
    });
}