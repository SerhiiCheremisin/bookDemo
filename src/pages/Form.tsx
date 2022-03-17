import React, {useState, useEffect} from 'react';
import '../styles/dist/styles-edit-page.css';
import { bookItem } from '../types/index';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import { setBooks } from '../redux/reducers/bookReducer';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiServices';

const Form = ():JSX.Element => {

  const navigation = useNavigate();

  const editedItem = useSelector( (state:RootState) => state.books.editedBook);
  const books = useSelector( (state:RootState) => state.books.books);
  const localItem = books.filter((book:bookItem) => book.id === editedItem);

  const [isAddingDone, setIsAddingDone] = useState<boolean>(false);
  const [bookDetails, setBookDetails] = useState<bookItem>({
    id :0,
    title :'',
    author: '',
    category:'',
    ISBN: '',
  })
  const [respondLogic, setRespondLogic] = useState({
    bookEditor : false,
    bookAdder: false
  })
  useEffect(() => {
    if (isAddingDone) {
      const delay =  ():void => {
        navigation('/');
      }
      setTimeout(delay, 2000 )
    }
  },[isAddingDone])

  useEffect(() => {
    const url = window.location.href;
    if (url.includes('/add-book')){
      setRespondLogic({
        bookEditor : false,
        bookAdder: true
      })   
      setBookDetails({
        id :0,
        title :'',
        author: '',
        category:'',
        ISBN: '',
      })
      return
    }
    if (url.includes('/edit-book')){
      setRespondLogic({
        bookEditor : true,
        bookAdder: false
      })  
      return  
    }
  }, [window.location.href])  

  useEffect(() => {
    if (respondLogic.bookEditor) {
      setBookDetails(localItem[0])
      return
    }
  },[respondLogic])

  const buttonLogic = respondLogic.bookEditor ? 'Edit this book' : 'Add one book'

  const formHandler = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();

    if (bookDetails.category === ''){
      alert('Please fill category field')
    }
    
    const lengts = respondLogic.bookAdder ? books.length +1 : books.length
    const book:bookItem = {
      id: lengts,
      title :bookDetails.title,
      author: bookDetails.author,
      category: bookDetails.category,
      ISBN: bookDetails.ISBN,
    }
   
   if (respondLogic.bookAdder) {
    apiService('post', book);
    setIsAddingDone(true);
   }
   if (respondLogic.bookEditor){
    apiService('put', book)
    navigation('/')
   }
  }
 
  const setBookItems = (e:React.ChangeEvent<HTMLInputElement>,field: string):void => {
    setBookDetails({
      ...bookDetails,
      [field] : e.target.value
    })
  }

  const selectHandler = (e:React.ChangeEvent<HTMLSelectElement>):void => {
    setBookDetails({
      ...bookDetails,
      category : e.target.value
    })
  }
  const isbnHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
    let target = e.target.value;
    if (target[target.length-1].match("^[a-zA-Z]")){
        return
    }
    setBookDetails({
      ...bookDetails,
      ISBN : e.target.value
    })
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
        <input onChange={(e) => setBookItems(e, 'title')} value={bookDetails.title} type="text" id='title' required/>
        <label htmlFor="author"> Author </label>  
        <input type="text" id='author' onChange={(e) => setBookItems(e, 'author')} value={bookDetails.author} required/>
        <label htmlFor="select"> Category </label>  
        <select onChange={(e) => selectHandler(e)} name="select" id="select" required>
        <option disabled selected>Pick one below</option> 
           <option value="Fiction">Fiction</option>
           <option value="Science fiction">Science fiction</option>
           <option value="Pulp fiction">Pulp fiction</option>
           <option value="Historical">Historical</option>
           <option value="Other">Other</option>
       </select>
       <label htmlFor="ISBN"> International Standard Book Number</label>  
       <input value={bookDetails.ISBN} onChange={(e) => isbnHandler(e)} type="text" id='ISBN' required/>
       <button type='submit'>{`${buttonLogic}`}</button>
      </form>
    </div>
  )
}

export default Form;
