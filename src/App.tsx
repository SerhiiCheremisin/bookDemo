import React from 'react';
import './styles/dist/main.css';

import { Routes, Route, Link } from "react-router-dom";

//pages
import Dashboard from './pages/Dashboard';
import BookChanger from './pages/BookChanger';
import EditPage from './pages/EditPage';

function App():JSX.Element {
  return (
    <div className='app-wrapper'> 
      <header className="navigation">
        <ul>
          <li><Link to='/'>Home page</Link></li>
          <li><Link to='/add-book'>Add book</Link></li>
        </ul>
      </header>
     <Routes>
       <Route path='/' element={<Dashboard/>}/>
       <Route path='/add-book' element={<BookChanger/>}/>
       <Route path='/edit-book' element={<EditPage/>}/>
     </Routes>
    </div>
  );
}

export default App;
