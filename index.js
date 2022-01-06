let myLibrary = [];

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

  }
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

const container = document.querySelector('.container');

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(theHobbit);