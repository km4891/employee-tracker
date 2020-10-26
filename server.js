const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port
    port: 3001,

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
                    viewDepartment();
                    break;
                case "Add employee":
                    viewDepartment();
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
                    viewDepartment();
                    break;
                default:
                    quit()

            }


        });

}

function addDepartment() {
    
    let query = "SELECT * FROM ee_info_db WHERE deptName=?"

    inquirer.prompt({
      
        type: "input",
        message: "What is the name of the department?",
        name: "deptName"
      
    })
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)
        startScreen()


    })

}


function quit() {

    connection.end()
    process.exit()

}