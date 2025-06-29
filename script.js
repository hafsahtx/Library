const myLibary = [];
const newbook = [];

function Book(title,author,num_of_pages,read){
    this.title = title;
    this.author = author;
    this.num_of_pages = num_of_pages;
    this.read = read;
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.num_of_pages} pages, ${this.read}`;
    };
    Book.prototype.book_status = function(status){
        if (status===true){
            this.read = "Read";
        }else {
            this.read = "Not read"
         }
        
    }
}

function addBookToLibary(title,author,num_of_pages,read) {
    let book_object = new Book(title, author, num_of_pages,read);
    let book_id = crypto.randomUUID();
    book_object.book_id = book_id;
    myLibary.push(book_object);
    
}

function createToggleWrapper(book,p){
    //toggle wrapper
    const toggle_wrapper = document.createElement("div");
    toggle_wrapper.classList.add("toggle-wrapper");
    toggle_wrapper.setAttribute("data-book-id",book.book_id);
    toggle_wrapper.setAttribute("data-role","toggle");
    //label
    const label = document.createElement("label");
    label.classList.add("switch");
    //span
    const span = document.createElement("span");
    span.classList.add("slider", "round");
    //spantext
    const spantext = document.createElement("span");
    spantext.classList.add("label-text");
    spantext.innerHTML = "Not Read";
    //input
    const input = document.createElement("input");
    input.setAttribute("type","checkbox"); 
    input.setAttribute("id","toggleSwitch");
    //toggles a book instance’s read status
    if(book.read === "Read"){
        input.checked = true;
        spantext.innerHTML = "Read";

    }else{
        input.checked = false;
        spantext.innerHTML = "Not read";
    }
    input.addEventListener("change",()=>{
        let status;
        if(input.checked){
            status = true;
            spantext.innerHTML = "Read";
            book.book_status(status);
            p.textContent = book.info();
            
        }else{
            status = false;
            spantext.innerHTML = "Not read";
            book.book_status(status);
            p.textContent = book.info();

        }
        
    });
    //add to DOM
    label.appendChild(input);
    label.appendChild(span);   
    toggle_wrapper.appendChild(label);
    toggle_wrapper.appendChild(spantext);
    return toggle_wrapper;
}


function createCard(book){
    let container = document.querySelector('.container');
    let top_wrapper = document.createElement("div");
    top_wrapper.classList.add("top-wrapper");
    let card = document.createElement('div')
    card.classList.add("card");
    card.setAttribute("data-book-id",book.book_id);
    let h4 = document.createElement('h4');
    h4.textContent = book.title;
    let p = document.createElement("p");
    p.textContent = book.info();
    const div = document.createElement("div");
    div.classList.add("wrapper");
    let toggle_wrapper = createToggleWrapper(book,p); //function call
    //create remove button
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove");
    removeBtn.setAttribute("data-book-id",book.book_id);
    //remove button pressed
    removeBtn.addEventListener("click",()=>{
    //link card and button with dataset
    let data = removeBtn.dataset.bookId;
    let card = document.querySelector(`[data-book-id = "${data}"]`);
    const container = document.querySelector(".container");
    container.removeChild(card);
    let index = 0;
    for (let book in myLibary){
        //remove from libaray
        if (book.book_id == data){
            myLibary.splice(index, 1);
        }
        index++;
    }});
    //add elements to DOM
    div.appendChild(toggle_wrapper);
    div.appendChild(removeBtn);
    top_wrapper.append(h4);
    top_wrapper.appendChild(p);
    card.appendChild(top_wrapper);
    card.appendChild(div);
    container.appendChild(card);
}

function displayBook(arr){
    for (const book of arr){
        createCard(book);
    }
}

function addNewBook(){
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const num_pages = document.getElementById("num_pages").value;
    const dropdown = document.getElementById("dropdown");
    const value = dropdown.value;
    let book_object = new Book(title, author, num_pages,value);
    let book_id = crypto.randomUUID();
    book_object.book_id = book_id;
    myLibary.push(book_object);
    createCard(book_object);
}

function showDialog(){
    const showBtn = document.getElementById("add-book");
    const submit = document.getElementById("confirmBtn");
    const dialog = document.getElementById("dialog");
    const cancel = document.getElementById("cancel");
    const form = document.getElementById("myForm");
    showBtn.addEventListener("click",()=>{
        //show dialog is add book button pressed
        dialog.showModal();
    });
    submit.addEventListener("click", (e)=>{
        //close dialog and add new book
        e.preventDefault();
        addNewBook();
        form.reset();
        dialog.close();
    });
    cancel.addEventListener("click",(e)=>{
        //close dialog
        e.preventDefault();
        form.reset();
        dialog.close();
    });
    
    
}


addBookToLibary("Yellow Face", "R.F.Kuang", 450, "Read");
addBookToLibary("The Palace of Illusions","Chitra Banerjee", 360, "Not read");
addBookToLibary("The White Tiger", "Arvind Adiga", 276, "Read");
addBookToLibary("The Reaper and Angels", "Alden Bell", 205, "Not read");
addBookToLibary("Life of Pi","Yann Martel", 460, "Read");
addBookToLibary("The curious incident of the dog in the night-time", "Mark Haddon", 226, "Read")
displayBook(myLibary);
showDialog();


