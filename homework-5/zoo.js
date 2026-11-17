console.log('Старт! Файл подключён ✅');

// ================ 1-3 ================

class ZooError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "ZooError";
    }
}

class Animal 
{
    constructor(name, age)
    {
        if(!name || name.trim() === "")
        {
            throw new ZooError("Name cannot be empty");
        }
        this.name = name;
        if(age < 0)
        {
            throw new ZooError("Age cannot be less than zero");
        }
        this.age = age;
    }
    info()
    {
        return `🐾 ${this.name}, ${this.age} г.`;
    }
    voice()
    {
        return `...`;
    }
    speak()
    {
        return `${this.name}: ${this.voice()}`;
    }
}

class Cat extends Animal
{
    constructor(name, age)
    {
        super(name, age);
    }
    info()
    {
        return `${super.info()}`;
    }
    voice()
    {
        return `Meow`;
    }
}

class Dog extends Animal
{
    constructor(name, age, breed)
    {
        super(name, age);
        this.breed = breed;
    }
    info()
    {
        return `${super.info()}, ${this.breed}`;
    }
    voice()
    {
        return `Woof`;
    }
}

// ================ 4-8 ================

class Parrot extends Animal
{
    constructor(name, age, word)
    {
        super(name, age);
        this.word = word;
    }
    info()
    {
        return `${super.info()}, ${this.word}`;
    }
    voice()
    {
        return `${this.word} ${this.word}`;
    }
}

class Zoo
{
    #animals = [];
    add(animal)
    {
        if(!(animal instanceof Animal))
        {
            throw new ZooError("This is not animal");
        }
        else if(this.find(animal.name))
        {
            throw new ZooError(`${animal.name} is exist`);
        }
        else
        {
            this.#animals.push(animal);
            console.log(`✅ ${animal.name} in zoo`);
        }
    }
    find(name) // Создал его только для того чтобы находить соответствие имен
    {
        for(const a of this.#animals)
        {
            if(a.name.toLowerCase() === name.toLowerCase())
            {
                return true;
            }
        }
        return false;
    }

    get size()
    {
        return this.#animals.length;
    }
    oldest()
    {
        let oldest = -1;
        let oldestName = "";
        for(const a of this.#animals)
        {
            if(oldest < a.age)
            {
                oldestName = a.name;
                oldest = a.age;
            }
        }
        return oldestName;
    }
}

const cat = new Cat("Barsik", 2);
const dog = new Dog("Reks", 1, "Baskervil");
const parrot = new Parrot("Kesha", 1, "Pirivet!");
try 
{
    const animals = [cat, dog, parrot];

    console.log(cat.info(),"|", dog.info());
    console.log(cat.speak());
    console.log(dog.speak());
    console.log(cat instanceof Animal);

    for(const a of animals)
    {
        console.log(a.speak())
    }
    const test = new Dog("", 1, "Test");
} 
catch (e) 
{
   console.log("❌ " + e.message); 
}
finally
{
    console.log("Verification completed");
}

const zoo = new Zoo();
const test = new Zoo();
try 
{
    zoo.add(cat);
    zoo.add(dog);
    zoo.add(cat);
} 
catch (e) 
{
   console.log("⚠️ " + e.message); 
}

try 
{
    zoo.add(test);
} 
catch (e) 
{
   console.log("⚠️ " + e.message); 
}

console.log(`Animals: ${zoo.size} | oldest: ${zoo.oldest()}`);
console.log(parrot instanceof Animal);