import React from 'react'
import '../styles/dist/styles-dashboard.css'
import { bookItem } from '../types/index';
import deleteBook from '../services/deleteBook';
import { useNavigate } from 'react-router-dom';
import { setEditedBook } from '../redux/reducers/bookReducer';
import { useSelector, useDispatch } from 'react-redux';
import apiService from '../services/apiServices';

interface bookItemProps {
  book : bookItem,
  shouldIUpdatePage: Function
}

const BookItem = ({book, shouldIUpdatePage} : bookItemProps) => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const deleteHandler = ():void  => {
      apiService('delete', book.id);
      shouldIUpdatePage(false);
    }
    
    const editHandler = ():void => {
      dispatch(setEditedBook(book.id));
      navigator('/edit-book');
    }

  return (
    <div className='book-item'>
        <h2>{book.title}</h2>
        <h2>{`Written by : ${book.author}`}</h2>
        <h2>{`Belongs to category : ${book.category}`}</h2>
        <h2>{`ISBN : ${book.ISBN}`}</h2>
        <div className='button-group'>
         <button onClick={editHandler}>Edit</button>
         <button onClick={ deleteHandler}>Delete</button>
        </div>
    </div>
  )
}

export default BookItem;
