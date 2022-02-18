import React, {useEffect, useState} from 'react'
import '../styles/dist/styles-edit-page.css'
import { bookItem } from '../types/index';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import editBook from '../services/editBook';
import { useNavigate } from 'react-router-dom';

const EditPage = () => {
    
const [title,setTitle] = useState<string>('');
const [author,setAuthor] = useState<string>('');
const [categoty,setCategoty] = useState<string>('');
const [isbn,setIsbn] = useState<string>('');

const navigation = useNavigate();

const editedItem = useSelector( (state:RootState) => state.books.editedBook);
const books = useSelector( (state:RootState) => state.books.books);
const localItem = books.filter(book => book.id === editedItem);

useEffect(() => {
 setTitle(localItem[0].title);
 setAuthor(localItem[0].author);
 setCategoty(localItem[0].category);
 setIsbn(String(localItem[0].ISBN));

},[])

const formHandler = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    if (title === '' || author === '' || categoty === '' || isbn === '' ){
      alert('You should fill all fields');
      return
    }
  
    const book:bookItem = {
      id: editedItem,
      title :title,
      author: author,
      category: categoty,
      ISBN: Number(isbn),
    }
    editBook(book)
    navigation('/')
  }

  const isbnHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
    let target = e.target.value;
    if (target[target.length-1].match("^[a-zA-Z]")){
        return
    }
    setIsbn(target)
   }

  return (
    <div className='editor-wrapper'>
      <form action="#" onSubmit={(e) => formHandler(e)}>
        <label htmlFor="title"> Book title </label>  
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" id='title' required/>
        <label htmlFor="author"> Author </label>  
        <input type="text" id='author' onChange={(e) => setAuthor(e.target.value)} value={author} required/>
        <label htmlFor="select"> Category </label>  
        <select onChange={(e) => setCategoty(e.target.value)} name="select" id="select" required>
        <option disabled selected>Pick one below</option> 
           <option value="Fiction">Fiction</option>
           <option value="Science fiction">Science fiction</option>
           <option value="Pulp fiction">Pulp fiction</option>
           <option value="Historical">Historical</option>
           <option value="Other">Other</option>
       </select>
       <label htmlFor="ISBN"> International Standard Book Number</label>  
       <input value={isbn} onChange={(e) => isbnHandler(e)} type="text" id='ISBN' required/>
       <button type='submit'>Edit this book</button>
      </form>
    </div>
  )
}


export default EditPage;