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

addBookToLibary("Yellow Face", "R.F.Kuang", 450, "Yes");
console.log(myLibary)