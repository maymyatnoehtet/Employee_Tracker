INSERT INTO departments (department_name)
VALUES 
('Executive Board'),
('Marketing'),
('Human Resources'),
('Finance'),
('Engineering'),
('Information Technology'),
('Maintenance');

INSERT INTO roles (job_title, salary, department_id)
VALUES 
('Chief Executive Officer',80000, 1),
('Marketing Manager', 40000, 2),
('HR Manager', 30000, 3),
('Finance Head', 4000, 4),
('Senior Engineer', 90000, 5),
('IT Manager', 90000, 6),
('Maintenance Manager', 70000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Mocha", "Cat", 1, 1),
    ("Mochi", "Cat", 2, 2),
    ("Micahel", "Brad", 3, 3),
    ("May", "Htet", 6, 6),
    ("Jason", "Wong", 7, 7);