
const deleteBook = (id:number) => {
 
    fetch(`http://localhost:3004/books/${id}`, {
        method: "DELETE",
       })
      }

export default deleteBook;