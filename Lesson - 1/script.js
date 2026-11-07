let balance = 1000;
let withdraw_amount = 0;
let deposit_amount = 0;
let operations = 0;
let input;
let withdraw_day_limit = 0;
const day_limit = 2000;
const USD = 1.7;
const EUR = 1.8;

do
{
    const org_pin = 123;
    let i = 0;
    const max = 3;
    while(i !== max)
    {
        const entr_pin = Number(prompt("Please enter your card's PIN code: \n"));
        if(entr_pin === org_pin)
        {
            break;
        }
        else
        {
            let atm = (max - i) - 1;
            alert("Incorrect PIN. You have " + atm + " attempts left.");
            i++;
        }
    }
    if(i === max)
    {
        alert("Your card is blocked");
        break;
    }
    let flag = true;
    while(flag)
    {
        input = Number(prompt
            (
                "Enter your choice\n" 
                + "1. Balance\n" 
                + "2. Withdraw\n"
                + "3. Deposit\n"
                + "0. Exit\n"
            )
        )
        switch(input)
        {
            case 1:
                alert("Balance: " + balance + " AZN" + " | " + balance / USD + " USD" + " | " + balance / EUR + " EUR");
                operations++;
                break;
            case 2:
                alert("Withdraw ( number > 500 = 1% Fee): \n");
                let withdraw_sum = Number(prompt("> "));
                if(withdraw_day_limit + withdraw_sum > day_limit)
                {
                    alert("Daily limit is 2000 AZN. Come back tomorrow");
                    break;
                }
                if(withdraw_sum <= 0)
                {
                    alert("The number is less than zero");
                    break;
                }
                if(withdraw_sum % 5 !== 0)
                {
                    alert("This number is not a multiple of five");
                    break;
                }
                withdraw_sum = withdraw_sum > 500 ? withdraw_sum * 1.01: withdraw_sum;
                if(withdraw_sum > balance)
                {
                    alert("The number is greater than the balance");
                    break;
                }
                withdraw_day_limit += withdraw_sum;
                balance -= withdraw_sum;
                alert("Balance: " + balance + " AZN" + " | " + balance / USD + " USD" + " | " + balance / EUR + " EUR");
                withdraw_amount+= withdraw_sum;
                operations++;
                break;
            case 3:
                alert("Deposit: \n");
                const deposit_sum = Number(prompt("> "));
                if(deposit_sum <= 0)
                {
                    alert("The number is less than zero");
                    break;
                }
                if(deposit_sum % 5 !== 0)
                {
                    alert("This number is not a multiple of five");
                    break;
                }
                balance += deposit_sum;
                alert("Balance: " + balance + " AZN" + " | " + balance / USD + " USD" + " | " + balance / EUR + " EUR");
                deposit_amount+= deposit_sum;
                operations++;
                break;
            case 0:
                alert("Withdraw operations amount: " + withdraw_amount);
                alert("Deposit operations amount: " + deposit_amount);
                alert("Total operations amount: " + operations);
                alert("Exit...");
                flag = false;
                break;
            default:
                alert("Incorrect input! Try again");
        }
    }
}
while(input !== 0)
{}
