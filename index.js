const {prompt} = require("inquirer")
require('console.table')
const db = require('./db')
const mysql = require('mysql2')
const { start } = require("repl");


function init(){
    questions()
}

async function questions() {
const {choice} = await prompt([
    {
    type: 'list',
    message: 'What would you like to do?',
    name: 'choice',
    choices: [
        {
            type: 'input',
            name: 'View all departments',
            value: 'VIEW_DEPARTMENTS'
        },
        {
            type: 'input',
            name: 'View all roles',
            value: 'VIEW_ROLES'
        },
        {
            type: 'input',
            name: 'View all employees',
            value: 'VIEW_EMPLOYEES'
        },
        {
            type: 'input',
            name: 'View all departments',
            value: 'username'
        }
            ]
    }])
    switch (choice){
        case 'VIEW_DEPARTMENTS':
            return viewDepartments();
        case 'VIEW_ROLES':
            return viewRoles();
        case 'VIEW_EMPLOYEES':
            return viewEmployees();          
}
}

async function viewDepartments(){
    const departments = await db.viewAllDepartments();
    console.table(departments);
    questions();
}

async function viewRoles(){
    const roles = await db.viewAllRoles();
    console.table(roles);
    questions();
}
async function viewEmployees(){
    const employees = await db.viewAllEmployees();
    console.table(employees);
    questions();
}

init();