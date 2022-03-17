import React, {useState, useEffect} from 'react';
import '../styles/dist/styles-dashboard.css'
import { bookItem } from '../types/index';
import BookItem from '../components/BookItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import { setBooks } from '../redux/reducers/bookReducer';
import Loader from '../components/Loader';
import apiService from '../services/apiServices';

const Dashboard = ():JSX.Element => {

const dispatch = useDispatch();
   
  const [dataisLoaded, setDataIsLoaded] = useState<boolean>(false); 
   
  const books = useSelector( (state:RootState) => state.books.books);

  useEffect(() => {
    apiService('get').then(data => dispatch(setBooks(data)))
    setDataIsLoaded(true);
},[])

  useEffect(() => {
   if (!dataisLoaded){
    apiService('get').then(data => dispatch(setBooks(data)))
    setDataIsLoaded(true);
   }
  },[dataisLoaded])

  return (
    <div className='dashboard-wrapper'>
     {
       !dataisLoaded ? 
       <Loader/> 
       :
       books.map((el:bookItem) => 
       ( <BookItem key={el.id} book = {el} shouldIUpdatePage = {setDataIsLoaded} /> ) ) 
     } 
    </div>
  )
}

export default Dashboard;