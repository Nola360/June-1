// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor for prototype storage
function UI() {

}


UI.prototype.addBookToList = function (book) {
  // Targets html table
  let list = document.querySelector('#book_list');

  // Constructs row for books
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><i class="fas fa-times"></td>
  `;
  list.appendChild(row);
}

UI.prototype.clearFields = function () {
  const title = document.querySelector('#title').value = '',
    author = document.querySelector('#author').value = '',
    isbn = document.querySelector('#isbn').value = '';
}

UI.prototype.deleteBook = function (e) {
  if (e.target.className === 'fas fa-times') {
    e.target.parentElement.parentElement.remove();

  }

}



UI.prototype.showAlert = function (message, className) {
  // Constructing div element
  const message_box = document.createElement('div');

  // Add ClassName
  message_box.className = `alert ${className}`;

  // Appending text to message 
  message_box.appendChild(document.createTextNode(message))

  // Targeting container
  let container = document.querySelector('.container');

  // Target book form
  let form = document.querySelector('#book_form');

  // Inserting message before form
  container.insertBefore(message_box, form);

  // Time out After 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove()
  }, 3000);
}


// Event Listners
document.getElementById('book_form').addEventListener('submit', function (e) {
  // Obtains input fields value
  const title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

  // Book object Instanciation
  const book = new Book(title, author, isbn);

  // UI object instanciation
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    // Error
    ui.showAlert('Fields cannot be left empty.', 'error');

  } else {

    // Adds book to list via method in UI constructor
    ui.addBookToList(book);

    ui.showAlert('Book added!', 'success');

    // Clear Fields
    ui.clearFields();
  }

  // console.log(book);
  e.preventDefault();
})

document.querySelector('#book_list').addEventListener('click', function (e) {

  // Instanciate UI
  const ui = new UI();

  // Call UI function
  ui.deleteBook(e);

  // Call UI showAlert function
  ui.showAlert('Book Deleted!', 'success');
});