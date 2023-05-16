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
                        "Add a new department",
                        "Add a new role", 
                        "Add a new employee", 
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

        case "Add a new department":
            addDepartment();
            break;

        case "Add a new role":
            addRole();
            break;

        case "Add a new employee":
            console.log("soon");
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
    const query = `SELECT * FROM Employees`
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // Restart the command-line
        start();
    });
}

// Function to add department
function addDepartment() {
    // Prompt the user to enter the name of a new department
    inquirer
        .prompt({
            type: "input",
            name: "name",
            message: "Enter the name of a new department:",
        })
        .then((answer) => {
            // Construct the SQL query to insert the new department into the database
            const query = `INSERT INTO departments (department_name) 
                           VALUES ("${answer.name}")`;
            // Execute the SQL query
            db.query(query, err => {
                if (err) throw err;
                console.log(`${answer.name} department added to the database!`);
                // Restart the application or perform any other necessary actions
                start();
            });
        });
}

// Function to add role
function addRole() {
    // Retrieve all departments from the database
    const query = "SELECT * FROM departments";
    db.query(query, (err, res) => {
        if (err) throw err;

        // Prompt the user to enter the details for the new role
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "job_title",
                    message: "Enter the title of the new role:",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Enter the salary of the new role:",
                },
                {
                    type: "list",
                    name: "department",
                    message: "Select the department for the new role:",
                    choices: res.map((department) => department.department_name),
                },
            ])
            .then((answers) => {
                // Find the department object based on the user's choice
                const department = res.find(
                    (department) => department.department_name === answers.department
                );

                // Insert the new role into the roles table
                const insert_Q = "INSERT INTO roles SET ?";
                db.query(
                    insert_Q,
                    {
                        job_title: answers.job_title,
                        salary: answers.salary,
                        department_id: department.id,
                    },
                    (err) => {
                        if (err) throw err;

                        console.log(
                            `A new role ${answers.job_title} with salary ${answers.salary} in 
                            the ${answers.department} department added to the database!`
                        );

                        // Restart the application
                        start();
                    }
                );
            });
    });
}



  