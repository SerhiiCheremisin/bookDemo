import { bookItem } from '../types/index';

const editBook = (book:bookItem) => {
    console.log(book)
    fetch(`http://localhost:3004/books/${Number(book.id)}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
          },            
        body: JSON.stringify(book) 
       })
}

export default editBook;