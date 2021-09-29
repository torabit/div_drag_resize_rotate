import React from 'react';
import '../App.css';
import MyDraggable from '../components/templates/MyDraggable';
import foo from './mat.png'

const App: React.FC = () => {
  return (
    <div className='container'
      style={{
        backgroundImage:`url(${foo})`,
        height: '500px',
      }}
    >
      <MyDraggable/>
    </div>

  );
};

export default App;