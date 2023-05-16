INSERT INTO departments (department_name)
VALUES
('Marketing'),
('Human Resources'),
('Finance');


INSERT INTO roles (title, salary, department_id)
VALUES 
('Marketing Manager', 40000.00, 1),
('HR Manager', 30000.00, 2),
('Finance Head', 40000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mocha", "Cat", 1, 1),
       ("Mochi", "Cat", 2, 2),
       ("Micahel", "Brad", 3, 3);
