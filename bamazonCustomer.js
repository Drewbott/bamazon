var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});

// connect to mysql server/database 

connection.connect(function(err) {
    if (err) throw err;
});
// function to display the table

function displayTable() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      console.log("-----------------**********-----------------")
      console.log("Welcome to Bam!azon")
        console.table(results)
    });
}

// displayTable()

function buyItems() {
    // query the database for all items being auctioned
    displayTable()
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "list",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
              }
              return choiceArray;
            },
            message: "What would you like to buy?",
            
         },
            {
                name: "qty",
                type: "input",
                message: "How many would you like to buy?",
                validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
                }
            }  
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          // console.log(answer)
          // console.log(results)
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.choice) {
              chosenItem = results[i];
            }
          }
          // console.log(chosenItem)
          // determine if bid was high enough
          if (chosenItem.stock_quantity >= parseInt(answer.qty)) {
            var newQty = chosenItem.stock_quantity - parseInt(answer.qty);
            var total = chosenItem.price * answer.qty
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQty
                },
                {
                  product_name: answer.choice
                }
                
              ],
              function(error) {
                if (error) throw err;
                console.log("Order placed successfully! You spent $" + total);
                setTimeout(buyItems, 3000)
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Sorry, we are all out of " +answer.choice+ " please pick another item");
            setTimeout(buyItems, 3000)
          }
        });
    });
  }
  
  buyItems();