INSERT INTO department (id, name) VALUES (1, 'Managment');
INSERT INTO department (id, name) VALUES (2, 'Sales');
INSERT INTO department (id, name) VALUES (3, 'Finance');
INSERT INTO department (id, name) VALUES (4, 'Kitchen');


INSERT INTO role (id,title, salary, department_id) VALUES (10,"Head Engineer", 150000, 1);
INSERT INTO role (id,title, salary, department_id) VALUES (20,"Senior Mgr.", 138500, 2);
INSERT INTO role (id,title, salary, department_id) VALUES (30,"Head Chef", 110000, 10);
        
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (001,'Sean', 'Allen', 'Senior', 10 );
INSERT INTO employee (id, first_name, last_name, role_id, ) VALUES (002, 'Mark', 'Young', 2, 10);
INSERT INTO employee (id, first_name, last_name, role_id, ) VALUES (003,'Leslie', 'Of The 6th', 3, null);
INSERT INTO employee (id, first_name, last_name, role_id, ) VALUES (004, 'Justin', 'Caya', 4, null);