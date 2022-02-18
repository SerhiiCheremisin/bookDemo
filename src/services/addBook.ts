import { bookItem } from '../types/index';


 const addBook = (books: bookItem) => {
   fetch('http://localhost:3004/books', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
      },            
    body: JSON.stringify(books) 
   })
  }
export default addBook;