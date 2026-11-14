// books example
const books = [
  { title: "The Master and Margarita", author: "Mikhail Bulgakov", year: 1967, due: null, pages: 480, isRead: false },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866, due: null, pages: 671, isRead: false },
  { title: "War and Peace", author: "Leo Tolstoy", year: 1869, due: null, pages: 1225, isRead: false },
  { title: "Ali and Nino", author: "Kurban Said", year: 1937, due: null, pages: 312, isRead: false },
  { title: "The Little Prince", author: "Antoine de Saint-Exupery", year: 1943, due: null, pages: 96, isRead: false },
];

function addBook(books, title, author, year, pages, isRead) 
{
    books.push({ title, author, year, due: null, pages, isRead });
}

function printBooks(books) 
{
    for (const book of books) 
    {
        console.log(`Title: ${book.title}, Author: ${book.author}, Year: ${book.year || 'N/A'}, Due: ${book.due}, Now reading: ${book.isRead}, Pages: ${book.pages}`);
    }
}

function countRead(books) 
{
    let readCount = 0;
    for (const book of books) 
    {
        if (book.isRead) 
        {
            readCount++;
        }
    }
    return readCount;
}

function findBooks(books, query)
{
    if (!query) 
    {
        return [];
    }
    const result = [];
    for (const book of books)
    {
        if (book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase())) 
        {
            result.push(book);
        }
    }
    return result;
}

function findBook(books, query)
{
    for (const book of books)
    {
        if (book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase())) 
        {
            return book;
        }
    }
    return undefined;
}

function oldestBook(books) 
{
    let oldest = books[0];
    for (const book of books) 
    {
        if (book.year && book.year < oldest.year) 
        {
            oldest = book;
        }
    }
    return oldest;
}

function averagePages(books)
{
    let count = 0;
    let sum = 0;
    for (const i in books)
    {
        if (books[i].pages)
        {
            sum += books[i].pages;
            count++;
        }
    }
    return Math.round(count > 0 ? sum / count : 0);
}

function markRead(books, title)
{
    for (const book of books)
    {
        if (book.title.toLowerCase() === title.toLowerCase()) 
        {
            book.isRead = true;
            return;
        }
    }
    console.log(`Book with title "${title}" not found.`);
}

function borrowBook(books, title)
{
    for (const book of books)
    {
        if (book.title.toLowerCase() === title.toLowerCase()) 
        {
            const due = new Date();
            due.setDate(due.getDate() + 14);
            book.due = due;
            console.log(`You have borrowed "${book.title}". It is due on ${book.due.toLocaleDateString('ru-RU')}.`);
            return;
        }
    }
    console.log(`Book with title "${title}" not found.`);
}

function isOverdue(book)
{
    return new Date() > book.due && book.due !== null;
}

setTimeout(() => console.log('📚 Dont forget to return!'), 3000);

function bookOfTheDay(books) 
{
    const i = Math.floor(Math.random() * books.length);
    for (const book of books) 
    {
        if (book.title === books[i].title) 
        {
            console.log(`Book of the Day: Title: ${book.title}, Author: ${book.author}, Year: ${book.year || 'N/A'}, Pages: ${book.pages}`);
        }
    }
    return books[i].title;
}

function Menu()
{
    console.log("Welcome to the Book Library!");
    let choice;
    do 
    {
        console.log("\nMenu:");
        console.log("1. Add a book");
        console.log("2. Print all books");
        console.log("3. Count read books");
        console.log("4. Find books by title or author");
        console.log("5. Find the oldest book");
        console.log("6. Calculate average pages");
        console.log("7. Mark a book as read");
        console.log("8. Borrow a book");
        console.log("9. Check if a book is overdue");
        console.log("10. Book of the Day");
        console.log("0. Exit");
        choice = Number(prompt("Enter your choice: "));
        switch (choice)
        {
            case 1:
                const title = prompt("Enter the book title: ");
                const author = prompt("Enter the book author: ");
                const year = Number(prompt("Enter the book year: "));
                const pages = Number(prompt("Enter the number of pages: "));
                addBook(books, title, author, year, pages);
                break;
            case 2:
                printBooks(books);
                break;
            case 3:
                console.log(`Number of read books: ${countRead(books)}`);
                break;
            case 4:
                const query = prompt("Enter the title or author to search for: ");
                const found = findBooks(books, query);
                if (found.length === 0) 
                {
                    console.log("Nothing found");
                }
                else 
                {
                    printBooks(found);
                }
                break;
            case 5:
                const oldest = oldestBook(books);
                console.log(`Oldest Book: Title: ${oldest.title}, Author: ${oldest.author}, Year: ${oldest.year || 'N/A'}, Now reading: ${oldest.isRead}, Pages: ${oldest.pages}`);
                break;
            case 6:
                console.log(`Average number of pages: ${averagePages(books)}`);
                break;
            case 7:
                const readTitle = prompt("Enter the title of the book to mark as read: ");
                markRead(books, readTitle);
                break;
            case 8:
                const borrowTitle = prompt("Enter the title of the book to borrow: ");
                borrowBook(books, borrowTitle);
                break;
            case 9:
                const overdueTitleOrAuthor = prompt("Enter the title or author of the book to check if it's overdue: ");
                const bookToCheck = findBook(books, overdueTitleOrAuthor);
                if (bookToCheck) 
                {
                    if(isOverdue(bookToCheck))
                    {
                        console.log("Book is overdue");
                    }
                    else if (bookToCheck.due === null)
                    { 
                        console.log("Book is not borrowed.");
                    }
                    else
                    {
                        console.log("Book is not overdue");
                    }
                } 
                else 
                {
                    console.log("Book not found.");
                }
                break;
            case 10:
                bookOfTheDay(books);
                break;
            case 0:
                console.log("Exiting the program. Goodbye!");
                break;
        }
    }
    while (choice !== 0);
}

function Main()
{
    Menu();
}
Main();