import React from 'react'
import '../styles/dist/styles-dashboard.css'
import { bookItem } from '../types/index';
import deleteBook from '../services/deleteBook';
import { useNavigate } from 'react-router-dom';
import { setEditedBook } from '../redux/reducers/bookReducer';
import { useSelector, useDispatch } from 'react-redux';

const BookItem = ({id, title, author, category, ISBN} : bookItem) => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const deleteHandler = ():void  => {
        deleteBook(id)
        window.location.reload()
    }
    
    const editHandler = ():void => {
      dispatch(setEditedBook(id));
      navigator('/edit-book');
    }

  return (
    <div className='book-item'>
        <h2>{title}</h2>
        <h2>{`Written by : ${author}`}</h2>
        <h2>{`Belongs to category : ${category}`}</h2>
        <h2>{`ISBN : ${ISBN}`}</h2>
        <div className='button-group'>
         <button onClick={editHandler}>Edit</button>
         <button onClick={ deleteHandler}>Delete</button>
        </div>
    </div>
  )
}

export default BookItem;
