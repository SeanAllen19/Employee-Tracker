const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");


const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // MySQL password
        password: '123password',
        database: 'employees_db',

    },
);

connection.connect(

    console.log(`Connected to the classlist_db database.`),
    console.clear(),
    console.log("======================================"),
    console.log(""),
    console.log("   WELCOME TO THE EMPLOYEE DATABASE   "),
    console.log(""),
    console.log("======================================"),
    startQuestions()
);


//   connection.query = util.promisify(connection.query);


async function startQuestions() {
    try {
        const question = await inquirer.prompt([{
            type: 'list',
            name: 'choice',
            message: ('What would you like to do?'),
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        }]);
        switch (question.choice) {
            case 'View all departments':
                return viewDepartments();
                break;
            case 'View all roles':
                return viewRoles();
                break;
            case 'View all employees':
                return viewEmployees();
                break;
            case 'Add a department':
                return addDepartment();
                break;
            case 'Add a role':
                return addRole();
                break;
            case 'Add an employee':
                return addEmployees();
                break;
            case 'Update an employee role':
                return updateEmployees();
                break;
            default:
                return quitIt();

        }
        // };
    } catch (err) {
        console.log(err)
    };
};


function viewDepartments() {
    connection.query("SELECT department.id AS ID, department.name AS Department FROM department",
        function (err, res) {
            if (err) throw err
            console.log("")
            console.table(res)
            console.log("^^^^^ DEPARTMENT LIST ABOVE ^^^^^")
            startQuestions()
        })
}

function viewRoles() {
    connection.query("SELECT role.id AS ID, role.title AS Title, role.department_id AS Department, role.salary AS Salary FROM role",
        function (err, res) {
            if (err) throw err
            console.log("")
            console.table(res)
            console.log("^^^^^ ROLE LIST ABOVE ^^^^^")
            startQuestions()
        })
}


function viewEmployees() {
    connection.query(`SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    CONCAT (employee.first_name, ' ', employee.last_name) 
    as NAME,
    role.title as ROLE, 
    department.name as DEPARTMENT, 
    CONCAT (manager.first_name, ' ', manager.last_name) 
    AS MANAGER FROM employee 
    LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department on role.department_id = department.id 
    LEFT JOIN employee manager on employee.manager_id = manager.id`,
        function (err, res) {
            if (err) throw err
            console.log("");
            console.log("*** EMPLOYEES LIST BY DEPARTMENT ***")
            console.log("");
            console.table(res);
            startQuestions()
        })
}



function addDepartment() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add? "
        },
        {
            name: "id",
            type: "input",
            message: "What is the new Department ID number? "
        }

    ]).then(function (answers) {
        connection.query("INSERT INTO department SET ? ",
            {
                name: answers.name,
                id: answers.id
            },
            function (err) {
                if (err) throw err

              
                    console.table(answers);
                    console.log("====== ADDED ======")
                startQuestions();
            }

        )
    })
}

// DEPARTMENT ARRAY SET UP FOR ROLE ADDITION __________________
var deptArr = [];
function selectDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            deptArr.push(res[i].name);
        }
    })
    return deptArr;
}

// ADD ROLE __________________________________
function addRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;", function (err, res) {
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is name of the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the new role?"
            },
            {
                name: "department",
                type: "rawlist",
                message: "Under which department does this new role fall?",
                choices: selectDepartment()
            }
        ]).then(function (answers) {
            var deptId = selectDepartment().indexOf(answers.choice) + 1
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: deptId
                },
                function (err) {
                    if (err) throw err
                    console.log("")
                    console.table(answers);
                    console.log("====== ADDED ======")
                    startQuestions();
                }
            )
        });
    });
};

const addEmployees = () => {
	const sqlQuery = 'INSERT INTO employee SET ?';
	const roleQuery = 'SELECT * FROM role';
	connection.query(roleQuery, function (error, results) {
		let roles = [];
		if (error) throw error;
		roles = results.map(result => (
            {
			id: result.id,
			title: result.title,
	        }
        ));

		inquirer
			.prompt([
				{
					type: 'input',
					name: 'first_name',
					message: 'Please, insert a employee first name',
				},
				{
					type: 'input',
					name: 'last_name',
					message: 'Please, insert a employee last name',
				},
				{
					type: 'list',
					name: 'role_id',
					message: 'What is the new employee role?',
					choices: roles.map(role => ({
						name: role.title,
						value: role.id,
					})),
				}
			])
			.then(response => {
				connection.query(sqlQuery, response, function (error, results) {
					if (error) throw error;
					console.log('Welcome the new employee!');
					startQuestions();
				});
			});
	});
};

// // UPDATE EMPLOYEE ROLE _______________________
// // ROLE ARRAY SET UP FOR EMPLOYEE ADDITION _____________________
// let roleArr = [];                                            
// function selectRole() {
//   connection.query("SELECT * FROM role", function(err, res) {
//     if (err) throw err
//     for (var i = 0; i < res.length; i++) {
//       roleArr.push(res[i].title);
//     }
//   })
//   return roleArr;
// }

const updateEmployees = () => {
	const sqlQuery = 'SELECT id, first_name, last_name, role_id FROM employee';
	connection.query(sqlQuery, function (error, results) {
		if (error) throw error;
		const employees = results.map(employee => ({
			name: `${employee.first_name} ${employee.last_name}`,
			value: employee.id,
		}));
		employees.unshift({
			name: 'None',
			value: null,
		});
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'id',
					message: "Which employee's role do you want to update?",
					choices: employees,
				},
			])
			.then(({ id }) => {
				const roleQuery = 'SELECT * FROM role';
				connection.query(roleQuery, function (error, results) {
					if (error) throw error;
					console.log(results);
					const roles = results.map(result => ({
						name: result.title,
						value: result.id,
					})); inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'role_id',
                            message: 'Which is the new role for this employee employee?',
                            choices: roles,
                        },
                    ])
                    .then(({ role_id }) => {
                        const updateQuery = `UPDATE employee SET ? WHERE id = ${id}`;
                        connection.query(updateQuery, { role_id }, function (error, results) {
                            if (error) throw error;
                            console.log("Updated employee's role");
                            startQuestions();
                        });
                    });
            });
        });
});
};

function quitIt() {
    console.log(""),
        console.log("======================================"),
        console.log(""),
        console.log("   LOGGING OUT - HAVE A GREAT SHIFT   "),
        console.log(""),
        console.log("======================================"),
        process.exit();
}

