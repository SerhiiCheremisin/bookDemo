import React, {useState, useEffect} from 'react';
import '../styles/dist/styles-edit-page.css'
import { bookItem } from '../types/index';
import addBook from '../services/addBook';
import fetchBooks from '../services/fetcBooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import { setBooks } from '../redux/reducers/bookReducer';
import { useNavigate } from 'react-router-dom';

const BookChanger = ():JSX.Element => {
 
    const [title,setTitle] = useState<string>('');
    const [author,setAuthor] = useState<string>('');
    const [categoty,setCategoty] = useState<string>('');
    const [isbn,setIsbn] = useState<string>('');
    const [isAddingDone, setIsAddingDone] = useState<boolean>(false);

   const navigatior = useNavigate();

   const dispatch = useDispatch();
   const books = useSelector ( (state:RootState) => state.books.books)

useEffect(() => {
    fetchBooks().then(data => dispatch(setBooks(data)))
},[])

useEffect(() => {
  if (isAddingDone) {
    const delay =  ():void => {
      navigatior('/');
    }
    setTimeout(delay, 2000 )
  }
},[isAddingDone])

const formHandler = (e:React.FormEvent<HTMLFormElement>):void => {
  e.preventDefault();

  if (title === '' || author === '' || categoty === '' || isbn === '' ){
    alert('You should fill all fields');
    return
  }

  const book:bookItem = {
    id: books.length +1,
    title :title,
    author: author,
    category: categoty,
    ISBN: Number(isbn),
  }
  const newArr:bookItem[] = books.slice();
  newArr.push(book);
  addBook(book);
  setIsAddingDone(true);

}

const isbnHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
 let target = e.target.value;
 if (target[target.length-1].match("^[a-zA-Z]")){
     return
 }
 setIsbn(target)
}

if (isAddingDone) {
  return (
    <>
    <h2>You have added a new book, good for you. You will be redirected in a few second</h2>
    </>
  )
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
       <button type='submit'>Add a book</button>
      </form>
    </div>
  )
}

export default BookChanger;
