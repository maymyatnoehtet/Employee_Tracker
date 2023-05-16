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
            addEmployee();
            break;

        case "Update an employee role":
            updateEmployeeRole();
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
    const query = 
                "SELECT roles.title, roles.id, departments.department_name, roles.salary \
                FROM roles \
                JOIN departments on roles.department_id = departments.id";
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}

// Function to view all employees
function viewAllEmployees() {
    const query =
                "SELECT e.id, e.first_name, e.last_name, r.title,\
                d.department_name, r.salary, \
                CONCAT(m.first_name, ' ', m.last_name) AS manager \
                FROM employees e \
                LEFT JOIN roles r ON e.role_id = r.id \
                LEFT JOIN departments d ON r.department_id = d.id \
                LEFT JOIN employees m ON e.manager_id = m.id";
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
            // Construct the SQL query 
            // to insert the new department into the database
            const query = `INSERT INTO departments (department_name) 
                           VALUES ("${answer.name}")`;
            // Execute the SQL query
            db.query(query, err => {
                if (err) throw err;
                console.log(`A new ${answer.name} department added to the database!`);
                // Restart the application
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
                    name: "title",
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
                // Find the department based on the user's choice
                const department = res.find(
                    (department) => department.department_name === answers.department
                );

                // Insert the new role into the roles table
                const insert_Q = "INSERT INTO roles SET ?";
                const values = {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: department.id
                };

                db.query(insert_Q, values, (err) => {
                    if (err) throw err;

                    console.log(`A new role ${answers.title} is added to the database!`);

                    // Restart the application
                    start();
                });
            });
    });
}


// Function to add employee
function addEmployee() {
    role_Q = "SELECT id, title FROM roles";
    // Retrieve list of roles from the database
    db.query(role_Q, (err, results) => {
        if (err) throw err;
        const roles = results.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

        const employee_Q = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees';
        // Retrieve list of employees from the database to use as managers
        db.query(employee_Q, (err, results) => {
            if (err) throw err;

            const managers = results.map(({ id, name }) => ({
                name,
                value: id,
            }));

            // Prompt the user for employee information
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "firstName",
                        message: "Enter the employee's first name:",
                    },
                    {
                        type: "input",
                        name: "lastName",
                        message: "Enter the employee's last name:",
                    },
                    {
                        type: "list",
                        name: "roleID",
                        message: "Select the employee role:",
                        choices: roles,
                    },
                    {
                        type: "list",
                        name: "managerId",
                        message: "Select the employee manager:",
                        choices: [
                            { name: "None", value: null },
                            ...managers,
                        ],
                    },
                ])
                .then((answers) => {
                    // Insert the employee into the database
                    const insert_Q = "INSERT INTO employees SET ?";
                    const values = {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: answers.roleID,
                        manager_id: answers.managerId,
                    };

                    db.query(insert_Q, values, (err) => {
                        if (err) throw err;
                        console.log("Employee added successfully");
                        start();
                    });
                })
        });
    });
}

// function to update an employee role
function updateEmployeeRole() {
    const employee_Q = 
                    "SELECT e.id, e.first_name, e.last_name, r.title \
                    FROM employees e\
                    LEFT JOIN roles r ON e.role_id = r.id";
                    
    const role_Q = "SELECT * FROM roles";
    db.query(employee_Q, (err, employee_res) => {
        if (err) throw err;
        db.query(role_Q, (err, role_res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Select the employee to update:",
                        choices: employee_res.map(
                            (employee) => `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Select the new role:",
                        choices: role_res.map((role) => role.title),
                    },
                ])
                .then((answers) => {
                    const employee = employee_res.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` === answers.employee
                    );
                    const role = role_res.find(
                        (role) => role.title === answers.role
                    );
                    const update_Q = "UPDATE employees SET role_id = ? WHERE id = ?";
                    const values = [roles.id, employees.id]
                    db.query(update_Q, values, (err) => {
                        if (err) throw err;
                        console.log(
                            `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                        );
                        // restart the application
                        start();
                    });
                });
        });
    });
}


  