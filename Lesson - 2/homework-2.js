
function clamp(value, min = 0, max = 10) // Нормализует значение в пределах от min до max
{
    if (value < min) 
    {
        return min;
    }
    if (value > max) 
    {
        return max;
    }
    return value;
}

function stats(...pets) // Функция для отображения статистики всех питомцев
{
    for (let pet of pets)
    {
        pet('stats');
    }
}

function sleep(hours) // Функция для имитации сна питомца
{
    if (hours <= 0)
    {
        return;
    }
    alert(`Zzz...`);
    sleep(hours - 1);
}

function createPet(petName) // Функция для создания нового питомца
{
    let name = petName;
    let satiety = 10;
    let happiness = 10;
    let turns = 0;

    function pet(command) 
    {
        switch(command) 
        {
            case 'feed':
                if (satiety < 10)
                {
                    satiety = clamp(satiety + 2);
                    alert(`${name} has been fed. Satiety is now ${satiety}`);
                }
                else
                {
                    alert(`${name} is already full!`);
                }
                break;
            case 'play':
                if (happiness < 10)
                {
                    happiness = clamp(happiness + 2);
                    alert(`${name} has been played with. Happiness is now ${happiness}`);
                }
                else
                {
                    alert(`${name} is already happy!`);
                }
                break;
            case 'status':
                const stick = happiness > 6 ? '😺' : happiness > 3 ? '😐' : '😿';
                alert(`${name}'s satiety: ${satiety}, happiness: ${happiness} ${stick}`);
                break;
            case 'sleep':
                sleep(1);
                break;
            case 'stats':
                alert(`Pet ${name}'has lived for ${turns} turns`);
                return true;
            default:
                alert('Invalid command');
                return true;
        }
        turns++;
        satiety = clamp(satiety - 1);
        happiness = clamp(happiness - 1);

        if (satiety <= 0 || happiness <= 0)
        {
            alert(`${name} has left the game 😿`);
            return false;
        }
        return true;
    }
    return pet;
}

function menu(command, pet) // Функция для отображения меню и обработки команд пользователя
{
    let isAlive = true;
    do{
        alert(`Welcome to the Pet Simulator!\n
               You can create a pet and take care of it by feeding and playing with it\n
               Commands (Enter a number):\n 
               1. feed\n
               2. play\n 
               3. status\n
               4. sleep\n
               0. exit\n`
            );
        command = Number(prompt("Enter a command: "));
        switch(command) 
        {
            case 1:
                isAlive = pet('feed');
                break;
            case 2:
                isAlive = pet('play');
                break;
            case 3:
                isAlive = pet('status');
                break;
            case 4:
                isAlive = pet('sleep');
                break;
            case 0:
                alert('Exiting the game. Goodbye!');
                return;
            default:
                alert('Invalid command');
        }
    }
    while(command !== 0 && isAlive)
    {};
}

function choosePet(name1, name2, pet1, pet2) // Функция для выбора питомца пользователем
{
    let choice = Number(prompt(`Choose a pet to interact with:\n
        1. ${name1}\n
        2. ${name2}\n
        Enter the number of your choice:`));
    switch(choice)
    {
        case 1:
            return pet1;
        case 2:
            return pet2;
        default:
            alert('Invalid choice');
            return null;
    }
}

function main() // Главная функция для запуска игры
{
    let command;
    const name1 = prompt("Enter a name for your first pet:");
    let pet1 = createPet(name1);
    alert(`You have created a pet named ${name1}`);
    
    const name2 = prompt("Enter a name for your second pet:");
    let pet2 = createPet(name2);
    alert(`You have created a pet named ${name2}`);

    const chosenPet = choosePet(name1, name2, pet1, pet2);
    if (chosenPet)
    {
        menu(command, chosenPet);
    }
    else
    {
        alert('No valid pet chosen. Exiting the game.');
        return;
    }
    stats(pet1, pet2);
}
main();
