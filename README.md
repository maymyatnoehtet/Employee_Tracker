# Employee_Tracker
## SQL Challenge
## Description

Video Link: https://drive.google.com/file/d/11OODtmT8pt8MxMVO0vOOAOz7U8EwavQX/view?usp=sharing

Repo Link: https://github.com/maymyatnoehtet/Employee_Tracker

## Installation
1. Express.js Version 4.18.2
2. Inquirer.js Version 8.2.4
3. mysql2 Version 3.3.1

## Usage Instruction
1. Clone the repository
2. Open integrated terminal
3. npm install -> Installation
4. node index.js to run the application
5. Use 'UP' and 'DOWN' arrow keys on the keyboard to do selection.

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Future Development

Current version doesn't handle data validation which means the new input data will not be validate before entering them into database. This can be fix in the future development.


