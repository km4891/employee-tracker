const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

   
    // Your username
    user: "root",

    // Your password
    password: "Jjrt2!171009",
    database: "employeedb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    startScreen()
});


function startScreen() {
    inquirer.prompt({
        type: "list",
        choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee role", "Quit"],
        message: "What would you like to do?",
        name: "option"
    })
        .then(function (result) {
            console.log("You entered: " + result.option)

            switch (result.option) {
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "View departments":
                    viewDepartment();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                default:
                    quit()
            }
        });
}

function addRole() {
    

    inquirer.prompt(
        [{
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
    },
    {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
    },
    {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
    }
    ]
    ).then(function(answer){
        let query = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleName}", "${answer.salaryTotal}", ${answer.deptID})`
        
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res)
            startScreen()
    })


    })

}

function addEmployee() {
    

    inquirer.prompt(
        [{
        type: "input",
        message: "What's the first name of the employee?",
        name: "eeFirstName"
    },
    {
        type: "input",
        message: "What's the last name of the employee?",
        name: "eeLastName"
    },
    {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
    },
    {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
    }
    ]
    ).then(function(answer){
        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.eeFirstName}", "${answer.eeLastName}", ${answer.roleID},${answer.managerID})`
        
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res)
            startScreen()
    })


    })

}

function updateEmployee() {
    

    inquirer.prompt(
        [
        {
      
        type: "list",
        message: "Which employee would you like to update?",
        choices: ["John", "Jill", "Jack", "Steve"],
        name: "eeUpdate"
      
    },

            {
      
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      
    }
        ]
    ).then(function(answer){
        // let query = `INSERT INTO department (name) VALUES ("${answer.deptName}")`
        let query = `'UPDATE employee SET role_id="updateRole" WHERE ${answer.eeUpdate}`
        
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res)
            startScreen()
    })


    })

}

function viewDepartment() {
    // select from the db
    let query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        startScreen()

    })
}

function viewRoles() {
    // select from the db
    let query = "SELECT * FROM role"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        startScreen()

    })

}

function viewEmployees() {
    // select from the db
    let query = "SELECT * FROM employee"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        startScreen()

    })

}







function quit() {
    connection.end()
    process.exit()
}