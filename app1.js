class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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

  showAlert(message, className) {
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

  deleteBook(e) {
    if (e.target.className === 'fas fa-times') {
      e.target.parentElement.parentElement.remove();
    }

  }

  clearFields() {
    const title = document.querySelector('#title').value = '',
      author = document.querySelector('#author').value = '',
      isbn = document.querySelector('#isbn').value = '';
  }
}



// Local Storage Class
class Store {

  static getBooks() {

    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;

  }

  static displayBooks() {

  }

  static addBook(book) {

    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

  }

  static removeBook() {

  }
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

    // Add to local Storage
    Store.addBook(book);

    ui.showAlert('Book added!', 'success');

    // Clear Fields
    ui.clearFields();
  }

  // console.log(book);
  e.preventDefault();

  console.log(ui);
})

document.querySelector('#book_list').addEventListener('click', function (e) {

  // Instanciate UI
  const ui = new UI();

  // Call UI function
  ui.deleteBook(e);

  // Call UI showAlert function
  ui.showAlert('Book Deleted!', 'success');
});