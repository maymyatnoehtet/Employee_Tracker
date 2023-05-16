INSERT INTO departments (department_name)
VALUES 
('Executive Board'),
('Marketing'),
('Human Resources'),
('Finance'),
('Engineering'),
('Information Technology'),
('Maintenance');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Chief Executive Officer',80000.00, 1),
('Marketing Manager', 40000.00, 2),
('HR Manager', 30000.00, 3),
('Finance Head', 40000.00, 4),
('Senior Engineer', 90000.00, 5),
('IT Manager', 90000.00, 6),
('Maintenance Manager', 70000.00, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Mocha", "Cat", 1, 1),
    ("Mochi", "Cat", 2, 2),
    ("Micahel", "Brad", 3, 3),
    ("May", "Htet", 6, 4),
    ("Jason", "Wong", 7, 5);