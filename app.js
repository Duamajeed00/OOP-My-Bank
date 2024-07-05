#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (amount >= amount) {
            this.balance -= amount;
            console.log(chalk.bgCyanBright(`\n\tWithdrawal of $${amount} successful. Remaining balance: $${this.balance} 🚀💰\n`));
        }
        else {
            console.log(chalk.bgRed.bold("\n\tInsufficient balance ❌\n"));
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more $100 is deposited.
            this.balance += amount;
            console.log(chalk.bgGreenBright(`\n\tDeposit of $${amount} successful. New balance: $${this.balance} 💰\n`));
        }
    }
    // Check Balance
    checkBalance() {
        console.log(chalk.bgBlueBright(`\n\tYour current balance is $${this.balance} 💰\n`));
    }
}
// Customer Class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create a new Bank Account
const accounts = [
    new BankAccount(10001, 1000),
    new BankAccount(10002, 2000),
    new BankAccount(10003, 3000),
];
// Create Customers
const customers = [
    new Customer("Dua", "Majeed", "Female", 22, 1234567890, accounts[0]),
    new Customer("Fajur", "Shaikh", "Female", 22, 9876543210, accounts[1]),
    new Customer("Inaya", "Shaikh", "Female", 19, 5555555555, accounts[2]),
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:",
        });
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (!customer) {
            console.log(chalk.bgRedBright.bold("\n\tInvalid account number!! 🙁\n"));
            continue;
        }
        if (customer) {
            console.log(chalk.bgYellowBright.bold.italic(`\n\tWelcome ${customer.firstName} ${customer.lastName}, Account Number: ${customer.account.accountNumber} ⚡🎈\n`));
            const action = await inquirer.prompt({
                name: "action",
                type: "list",
                message: "Choose an action:",
                choices: ["Check Balance", "Deposit", "Withdraw", "Exit"],
            });
            switch (action.action) {
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "depositAmount",
                        type: "number",
                        message: "Enter the amount to deposit:",
                    });
                    customer.account.deposit(depositAmount.depositAmount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "withdrawAmount",
                        type: "number",
                        message: "Enter the amount to withdraw:",
                    });
                    customer.account.withdraw(withdrawAmount.withdrawAmount);
                    break;
                case "Exit":
                    console.log(chalk.bgRed.bold("\n\tExiting the application... 🤔\n"));
                    return;
            }
        }
    } while (true);
}
// Run the application
service();
