let myLibrary = [];
let rowNumber = 1;

const rows = document.querySelectorAll('.row');
const container = document.querySelector('.container');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "read" : "not read yet";
  this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    for (; rowNumber < rows.length; rowNumber++) {
      if (rows[rowNumber].childNodes.length - countTextNodes(rows[rowNumber].childNodes) < 3) {
        rows[rowNumber].append(card(myLibrary[i]));
        break;
      } else {
        const row = document.createElement('div');
        row.classList.add('row', 'top-buffer');
        row.append(card(myLibrary[i]));
        container.append(row);
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

  cardBody.append(title);
  cardBody.append(author);
  cardBody.append(info);

  card.append(cardBody);

  div.append(card);

  return div;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(theHobbit);

displayBooks();