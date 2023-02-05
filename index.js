const {prompt} = require('inquirer');
require("console.table");
const db = require("./db/function");

function init() {
    startQuestions()
}

async function startQuestions() {
    const { choice } = await prompt([
        {
            type: 'list',
            message: 'Welcome what would you like to do?',
            name: 'choice',
            choices: [
                {
                    type: 'input',
                    name: 'View all departments',
                    value: 'VIEW_DEPARTMENTS',
                },
                {
                    type: 'input',
                    name: 'View all roles',
                    value: 'VIEW_ROLES',
                },
                {
                    type: 'input',
                    name: 'View all managers',
                    value: 'VIEW_MANAGERS',
                },
                {
                    type: 'input',
                    name: 'add a department',
                    value: 'linkedIn',
                },
                {
                    type: 'input',
                    name: 'add a roles',
                    value: 'linkedIn',
                },
                {
                    type: 'input',
                    name: 'add a employee',
                    value: 'linkedIn',
                },
                {
                    type: 'input',
                    name: 'update an employee',
                    value: 'linkedIn',
                },
                {
                    name: 'Exit Program',
                    value: 'QUIT_IT',
                },
            ]
        }])
    switch (choice) {
        case 'VIEW_DEPARTMENTS':
            return viewDepartments();
            break;
        case 'VIEW_ROLES':
            return viewRoles();
            break;
        case 'VIEW_':
            return viewDepartments();
            break;
        case 'VIEW_ROLES':
            return viewRoles();
            break;
        default:
            return quitIt();

    }
};

async function viewDepartments() {
    const department = await db.viewAllDepartments();
    console.table(department);
    startQuestions();
}

async function viewRoles() {
    const roles = await db.viewAllroless();
    console.table(roles);
    startQuestions();
}

async function viewManager() {
    const manager = await db.viewAllManager();
    console.table(Manager);
    startQuestions();
}

function quitIt() {
    process.exit;
}

init();