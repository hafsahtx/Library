const myLibary = [];

function Book(title,author,num_of_pages,read){
    this.title = title;
    this.author = author;
    this.num_of_pages = num_of_pages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${num_of_pages} pages, ${read}`;
    };
}

function addBookToLibary(title,author,num_of_pages,read) {
    let book_object = new Book(title, author, num_of_pages,read);
    let book_id = crypto.randomUUID();
    book_object.book_id = book_id;
    myLibary.push(book_object);
    
}

function createCard(book){
    let container = document.querySelector('.container');
    let card = document.createElement('div')
    card.classList.add("card");
    let h4 = document.createElement('h4');
    h4.textContent = book.title;
    let p = document.createElement("p");
    p.textContent = book.info();
    card.appendChild(h4);
    card.appendChild(p);
    container.appendChild(card);
}

function displayBook(arr){
    for (const book of arr){
        createCard(book);
    }
}

addBookToLibary("Yellow Face", "R.F.Kuang", 450, "Yes");
addBookToLibary("The Palace of Illusions","Chitra Banerjee", 360, "Not yet");
addBookToLibary("The White Tiger", "Arvind Adiga", 276, "Yes");
addBookToLibary("The Reaper and Angels", "Alden Bell", 205, "Not yet");
addBookToLibary("Life of Pi","Yann Martel", 460, "Yes");
addBookToLibary("Marmalade", "J.F Bob", 400, "Yes");
addBookToLibary("The curious incident of the dog in the night-time", "Mark Haddon", 226, "Yes")
displayBook(myLibary);