import React from 'react';
import '../styles/dist/main.css';

export default function Loader():JSX.Element {
  return (
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}
