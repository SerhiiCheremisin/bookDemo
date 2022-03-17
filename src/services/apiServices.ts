import { bookItem } from '../types/index';
const URL:string = 'http://localhost:3004/books';


const apiService = async (method: string, ...args:any) => {
   // there will be added only one argument either book id or book item
    const addedArg = args[0]

   if (method === 'get') {
    try{
        const request = await fetch(`${URL}`);
        const responnd = await request.json()
        return responnd
      }
      catch (error){
        console.log(error)
      }
    }
   if (method === 'delete') {   
    try {
        fetch(`${URL}/${addedArg}`, {
            method: "DELETE",
           })}
     catch (error) {
        console.log(error)
       }
    }
    if (method === 'put'){
        try {
        fetch(`${URL}/${addedArg.id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },            
          body: JSON.stringify(addedArg) 
       })
        } catch (error) {
         console.log(error)
        }
    }
    if (method === 'post') {
        try {
          fetch(`${URL}`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },            
              body: JSON.stringify(addedArg) 
             })  
        } 
        catch (error) {
            console.log(error)   
        }
    }

   }

   export default apiService;