// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;

}

// UI Constructor

function UI() {

}


UI.prototype.addBookToList = function (book) {
  let list = document.querySelector('#book_list');

  const row = document.createElement('tr');

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><i class="fas fa-times"></td>
  `;

  list.appendChild(row);



}

// Event Listners
document.getElementById('book_form').addEventListener('submit', function (e) {

  // Targets input value
  const title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  ui.addBookToList(book);


  console.log(book);
  e.preventDefault();
})