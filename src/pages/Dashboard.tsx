import React, {useState, useEffect} from 'react';
import '../styles/dist/styles-dashboard.css'
import fetchBooks from '../services/fetcBooks';
import { bookItem } from '../types/index';
import BookItem from '../components/BookItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import { setBooks } from '../redux/reducers/bookReducer';
import Loader from '../components/Loader';

const Dashboard = ():JSX.Element => {

const dispatch = useDispatch();
   
  const [dataisLoaded, setDataIsLoaded] = useState<boolean>(false); 
   
  const books = useSelector( (state:RootState) => state.books.books);

  useEffect(() => {
    fetchBooks().then(data => dispatch(setBooks(data)))
    setDataIsLoaded(true);
},[])


  return (
    <div className='dashboard-wrapper'>
     {
       !dataisLoaded ? 
       <Loader/> 
       :
       books.map((el:bookItem) => 
       ( <BookItem key={el.id} id={el.id} title={el.title} author={el.author} category={el.category} ISBN={el.ISBN}/> ) ) 
     } 
    </div>
  )
}

export default Dashboard;