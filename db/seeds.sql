INSERT INTO departments (department_name)
VALUES 
    ('IT'),
    ('Sales'),
    ('HR');

INSERT INTO roles (job_title, department_id, salary)
VALUES
    ('Sales Assistant', 2, 4000),
    ('Junior Software Developer', 1, 5000),
    ('HR Manager', 3, 6000);

INSERT INTO employees (first_name, last_name, job_id, department_id, salary, manager_id)
VALUES
    ("May", "Htet", 2, 1, 5000, 2),
    ("Jason", "Wong", 3, 3, 6000, 0);