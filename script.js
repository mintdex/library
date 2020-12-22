let myLibrary = [];

const cardsContainer = document.querySelector(".cards-container");
const popUpForm = document.querySelector(".popup-form");
const closePopup = document.querySelector(".close");
closePopup.addEventListener("click", () => {
    popUpForm.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
});

const newBookBtn = document.querySelector(".newBtn");
newBookBtn.addEventListener("click", (e) => {
    popUpForm.style.display = "flex";
    document.querySelector(".overlay").style.display = "block";
})

const addBtn = document.querySelector(".addBtn");

class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = read;
    }
}

function addBookToLibrary(e) {
    e.preventDefault();
    popUpForm.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
    const title = myForm.title.value,
        author = myForm.author.value,
        pages = myForm.pages.value,
        read = myForm.read.checked;
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    setData();
    myForm.reset();
    renderBookCards(myLibrary);
}

function removeBookFromLib(e) {
    const bookIndex =  e.target.parentNode.id;
    myLibrary.splice(bookIndex, 1);
    setData();
    renderBookCards(myLibrary);
}

function createReadButton(bookInfo) {
        const btnElement = document.createElement("button");
        btnElement.type = "button";
        btnElement.setAttribute("id", "readBtn");
        if (bookInfo.haveRead) {
            btnElement.textContent = "Finished";
            btnElement.style.backgroundColor = "#55a630";
        } else {
            btnElement.textContent = "Not yet";
            btnElement.style.backgroundColor = "#e63946";
        }
        btnElement.addEventListener("click", (e) => {
            bookInfo.haveRead = !bookInfo.haveRead;
            if (bookInfo.haveRead) {
                btnElement.textContent = "Finished";
                btnElement.style.backgroundColor = "#55a630";
            } else {
                btnElement.textContent = "Not yet";
                btnElement.style.backgroundColor = "#e63946";
            }

        })
        return btnElement;
}

function renderBookCards(arr) {
    
    cardsContainer.textContent = ""; 
    arr.forEach((book, index)=> {
        // create div with class card for each book
        const divCard = document.createElement("div");
        divCard.className = "card";
        divCard.setAttribute("id", index);

        // add book info to the card
        for (let prop in book) {
            if (prop === "haveRead") {
                continue;
            }
            const divElement = document.createElement("div");
            divElement.setAttribute("id", prop);
            divElement.textContent = book[prop];

            // add info to the card div
            divCard.appendChild(divElement);
        }

        divCard.appendChild(createReadButton(book));

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("id", "removeBtn");
        removeBtn.addEventListener("click", removeBookFromLib);

        divCard.appendChild(removeBtn);

        cardsContainer.appendChild(divCard);
    });
}



addBtn.addEventListener("click", addBookToLibrary);

function setData() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getData() {
    if (!localStorage.myLibrary) {

        return;
    } else {
        myLibrary = JSON.parse(localStorage.myLibrary);

    }
    renderBookCards(myLibrary);
}
getData();