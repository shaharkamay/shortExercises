class BookList {
    constructor(
        numOfBooksRead,
        numOfBooksNotRead,
        nextBook,
        currentBook,
        lastBook,
        books
    ) {
        this.numOfBooksRead = numOfBooksRead;
        this.numOfBooksNotRead = numOfBooksNotRead;
        this.nextBook = nextBook;
        this.currentBook = currentBook;
        this.lastBook = lastBook;
        this.books = books;
    }

    add(book) {
        this.books.push(book);
    }
    finishCurrentBook() {
        this.currentBook.read = true;
        this.currentBook.readDate = Date(Date.now());
        this.lastBook = this.currentBook;
        this.currentBook = this.nextBook;
        this.nextBook = this.books.find((book) => book.read === false);
    }
}

class Book {
    constructor(title, genre, author, read, readDate) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.read = read;
        this.readDate = readDate;
    }
}