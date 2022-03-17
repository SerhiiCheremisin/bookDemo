import React from 'react';
import './styles/dist/main.css';

import { Routes, Route, Link } from "react-router-dom";

//pages
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';

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
       <Route path='/add-book' element={<Form/>}/>
       <Route path='/edit-book' element={<Form/>}/>
     </Routes>
    </div>
  );
}

export default App;
