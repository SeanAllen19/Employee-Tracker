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
    try{
        const question = await inquirer.prompt([{
            type: 'list',
            name: 'choice',
            message: ('What would you like to do?'),
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        }]);
            switch (question.choice) {
                case 'View all departments':
                    return viewDepartments() ;
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
    } catch(err) {
        console.log(err)
    };
};
        
            //     {
            //         type: 'input',
            //         name: 'View all departments',
            //         value: 'VIEW_DEPARTMENTS',
            //     },
            //     {
            //         type: 'input',
            //         name: 'View all roles',
            //         value: 'VIEW_ROLES',
            //     },
            //     {
            //         type: 'input',
            //         name: 'View all managers',
            //         value: 'VIEW_MANAGERS',
            //     },
            //     {
            //         type: 'input',
            //         name: 'add a department',
            //         value: 'linkedIn',
            //     },
            //     {
            //         type: 'input',
            //         name: 'add a roles',
            //         value: 'linkedIn',
            //     },
            //     {
            //         type: 'input',
            //         name: 'add a employee',
            //         value: 'linkedIn',
            //     },
            //     {
            //         type: 'input',
            //         name: 'update an employee',
            //         value: 'linkedIn',
            //     },
            //     {
            //         name: 'Exit Program',
            //         value: 'QUIT_IT',
            //     },
            // ]

    // switch (start) {
    //     case 'VIEW_DEPARTMENTS':
    //         return viewDepartments();
    //         break;
    //     case 'VIEW_ROLES':
    //         return viewRoles();
    //         break;
    //     case 'VIEW_':
    //         return viewDepartments();
    //         break;
    //     case 'VIEW_ROLES':
    //         return viewRoles();
    //         break;
    //     default:
    //         return quitIt();

    // }
// };


// VIEW DEPARTMENTS ------------------------
///////// WHEN I choose to view all departments
/////////THEN I am presented with a formatted table showing department names and department ids
function viewDepartments() {
    connection.query("SELECT department.id AS ID, department.name AS Department FROM department",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log("*** DEPARTMENT LIST ***")
      console.log("")
      console.table(res)
      startQuestions()
  })
}

//WHEN I choose to view all roles
//THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles() {
    connection.query("SELECT role.id AS ROLE_ID, role.title AS Title, role.salary AS Salary FROM role",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log("*** ROLE LIST ***")
      console.log("")
      console.table(res)
      startQuestions()
  })
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

function viewEmployees() {
    connection.query("", 
    function(err, res) {
      if (err) throw err
      console.log ("");
      console.log("*** EMPLOYEES LIST BY DEPARTMENT ***")
      console.log ("");
      console.table(res)
      startQuestions()
    })
  }



// async function viewDepartments() {
//     const department = await db.viewAllDepartments();
//     console.table(department);
//     startQuestions();
// }


// async function viewRoles() {
//     const results = await db.promise().query(sql);

//     console.table('', results[0]);
//     startQuestions();
// }

// async function viewManager() {
//     const manager = await db.viewAllManager();
//     console.table(Manager);
//     startQuestions();
// }

function quitIt() {
    console.log (""),
    console.log ("======================================"),
    console.log (""),
    console.log ("   LOGGING OUT - HAVE A GREAT SHIFT   "),
    console.log (""),
    console.log ("======================================"),
    process.exit();
}

