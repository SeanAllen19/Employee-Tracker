INSERT INTO department ( name) VALUES ('Managment');
INSERT INTO department ( name) VALUES ( 'Sales');
INSERT INTO department ( name) VALUES ( 'Finance');
INSERT INTO department ( name) VALUES ('Kitchen');

INSERT INTO role (title, salary, department_id) VALUES ("Head Engineer", 150000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Mgr.", 138500, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Head Chef", 110000, 1);
        
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Sean', 'Allen', 1, null );
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Mark', 'Young', 2, 2);
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Leslie', 'Of The 6th', 3, null);
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Justin', 'Caya', 4, 4);