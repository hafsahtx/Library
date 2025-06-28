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



function createCard(book){
    let container = document.querySelector('.container');
    let card = document.createElement('div')
    card.classList.add("card");
    card.setAttribute("data-book-id",book.book_id);
    let h4 = document.createElement('h4');
    h4.textContent = book.title;
    let p = document.createElement("p");
    p.textContent = book.info();
    const div = document.createElement("div");
    div.classList.add("wrapper");
    const toggle_wrapper = document.createElement("div");
    toggle_wrapper.classList.add("toggle-wrapper");
    const label = document.createElement("label");
    label.classList.add("switch");
    const input = document.createElement("input");
    const span = document.createElement("span");
    span.classList.add("slider", "round");
    const spantext = document.createElement("span");
    spantext.classList.add("label-text");
    spantext.innerHTML = "Not Read";
    input.setAttribute("type","checkbox"); 
    input.setAttribute("id","toggleSwitch");
    label.appendChild(input);
    label.appendChild(span);   
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
            console.table(book);
            p.textContent = book.info();
            
        }else{
            status = false;
            spantext.innerHTML = "Not read";
            book.book_status(status);
            p.textContent = book.info();
            console.table(book);

        }
        
    });
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Book";
    removeBtn.classList.add("remove");
    removeBtn.setAttribute("data-book-id",book.book_id);
    removeBtn.addEventListener("click",()=>{
    let data = removeBtn.dataset.bookId;
    let card = document.querySelector(`[data-book-id = "${data}"]`);
    const container = document.querySelector(".container");
    container.removeChild(card);
    let index = 0;
    for (let book in myLibary){
        if (book.book_id == data){
            myLibary.splice(index, 1);
        }
        index++;
    }});
    toggle_wrapper.appendChild(label);
    toggle_wrapper.appendChild(spantext);
    div.appendChild(toggle_wrapper);
    div.appendChild(removeBtn);
    card.appendChild(h4);
    card.appendChild(p);
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
        dialog.showModal();
    });
    submit.addEventListener("click", (e)=>{
        e.preventDefault();
        addNewBook();
        form.reset();
        dialog.close();
    });
    cancel.addEventListener("click",(e)=>{
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
addBookToLibary("Marmalade", "J.F Bob", 400, "Not Read");
addBookToLibary("The curious incident of the dog in the night-time", "Mark Haddon", 226, "Read")
displayBook(myLibary);
showDialog();


