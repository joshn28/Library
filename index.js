let myLibrary = [];
let rowNumber = 0;
let bookIndex = 1;
let i = 0

let rows = document.querySelectorAll('.top-buffer');
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

Book.prototype.changeReadStatus = function() {
  this.read = !this.read;
}

function clearInputs() {
  document.querySelector('#book-title').value = "";
  document.querySelector('#author').value = "";
  document.querySelector('#pages').value = "";
  document.querySelector('#read-check').checked = false;
}

function addBookToLibrary() {
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read-check');
  const newBook = new Book(title.value, author.value, pages.value, read.checked);
  clearInputs();
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  for (; i < myLibrary.length; i++) {
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
        rows = document.querySelectorAll('.top-buffer');
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
  div.setAttribute('data-index', bookIndex);
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
  info.setAttribute('data-index', bookIndex);
  info.textContent = book.info();

  const btnDiv = document.createElement('div');
  btnDiv.classList.add('text-right');

  const statusBtn = document.createElement('button');
  statusBtn.classList.add('btn', 'mr-2');
  if (book.read == "not read yet") {
    statusBtn.classList.add('btn-secondary');
    statusBtn.textContent = 'Read';
  } else {
    statusBtn.classList.add('btn-success');
    statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
  </svg> Read `;
  }
  statusBtn.setAttribute('data-index', bookIndex);
  statusBtn.addEventListener('click', (e) => {
    const bookInfo = document.querySelector(`p[data-index="${e.currentTarget.dataset.index}"]`);
    if (e.currentTarget.classList.contains('btn-success')) {
      bookInfo.textContent = bookInfo.textContent.replace('read', 'not read yet');
      e.currentTarget.classList.remove('btn-success');
      e.currentTarget.classList.add('btn-secondary');
      e.currentTarget.textContent = "Read";
      myLibrary[e.currentTarget.dataset.index-1].read = "not read yet"; 
    } else {
      bookInfo.textContent = bookInfo.textContent.replace('not read yet', 'read');
      e.currentTarget.classList.remove('btn-secondary');
      e.currentTarget.classList.add('btn-success');
      e.currentTarget.textContent = "";
      e.currentTarget.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
    </svg> Read `;
      myLibrary[e.currentTarget.dataset.index-1].read = "read"; 
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-danger');
  deleteBtn.setAttribute('data-index', bookIndex);
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener('click', (e) => {
    myLibrary.splice(e.currentTarget.dataset.index-1, 1);
    const book = document.querySelector(`div[data-index="${e.currentTarget.dataset.index}"]`);
    book.parentNode.removeChild(book);
    
    for (let book of rows) {
      book.parentNode.removeChild(book);
    }

    i = 0;
    rowNumber = 0;
    bookIndex = 1;

    const div = document.createElement('div');
    div.classList.add('row', 'top-buffer');
    container.append(div);
    rows = document.querySelectorAll('.top-buffer');
    displayBooks();
  });

  btnDiv.append(statusBtn);
  btnDiv.append(deleteBtn);

  cardBody.append(title);
  cardBody.append(author);
  cardBody.append(info);
  cardBody.append(btnDiv);

  card.append(cardBody);

  div.append(card);

  bookIndex++;

  return div;
}