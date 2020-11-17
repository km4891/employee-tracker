INSERT INTO department (name)
VALUES ("Legal"), ("Management"), ("Engineering"), ("Accounting"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUE ("manager", 95000.00, 2), ("engineer", 82000, 3), ("accountant", 62500, 4), ("lawyer", 157500, 1), ("sales person", 85650, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ozzy", "Osbourne", 1, null), ("Joan", "Jett", 4, 3), ("Jack", "Black", 3, 2), ("Wax", "Mustang", 5, 2);