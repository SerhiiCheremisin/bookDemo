 

 const fetchBooks = async () => {
    try{
        const request = await fetch('http://localhost:3004/books');
        const responnd = await request.json()
        return responnd
      }
      catch (error){
        console.log(error)
      }
 }

 export default fetchBooks;