let myLibrary = [];
let rowNumber = 1;
let bookIndex;

let rows = document.querySelectorAll('.row');
const container = document.querySelector('.container');

function onlyNumbers(e) {
  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (e.target.value === "0" && e.key === "0") {
        return false;
      } else if (e.target.value === "0" && e.key !== "0") {
        e.target.value = "";
      }
      return true;
    default:
      return false;
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "read" : "not read yet";
  this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

function addBookToLibrary() {
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read-check');
  const newBook = new Book(title.value, author.value, pages.value, read.checked);
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const allRows = document.querySelector('.top-buffer');
  while (allRows.firstChild) {
    allRows.removeChild(allRows.firstChild);
  }
  bookIndex = 1;
  for (let i = 0; i < myLibrary.length; i++) {
    for (; rowNumber < rows.length; ) {
      if (rows[rowNumber].childNodes.length - countTextNodes(rows[rowNumber].childNodes) < 3) {
        rows[rowNumber].append(card(myLibrary[i]));
        break;
      } else {
        rowNumber++;
        const row = document.createElement('div');
        row.classList.add('row', 'top-buffer');
        row.append(card(myLibrary[i]));
        container.append(row);
        rows = document.querySelectorAll('.row');
        break;
      }
    }
  }
}

function countTextNodes(nodeList) {
  let count = 0;
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].nodeType == 3) {
      count++;
    }
  }
  return count;
}

function card(book) {
  const div = document.createElement('div');
  div.classList.add('col-sm-4');

  const card = document.createElement('div');
  card.classList.add('card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = book.title;

  const author = document.createElement('h6');
  author.classList.add('card-subtitle', 'mb-2', 'text-muted');
  author.textContent = book.author;

  const info = document.createElement('p');
  info.classList.add('card-text');
  info.textContent = book.info();

  const btnDiv = document.createElement('div');
  btnDiv.classList.add('text-right');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-danger');
  deleteBtn.setAttribute('data-index', bookIndex);
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener('click', (e) => {
    myLibrary.splice(e.currentTarget.dataset.index-1, 1);
    displayBooks();
  })

  btnDiv.append(deleteBtn)

  cardBody.append(title);
  cardBody.append(author);
  cardBody.append(info);
  cardBody.append(btnDiv);

  card.append(cardBody);

  div.append(card);

  bookIndex++;

  return div;
}