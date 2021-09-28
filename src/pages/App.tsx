import React from 'react';
import '../App.css';
import MyDraggable from '../components/templates/MyDraggable';

const App: React.FC = () => {
  return (
    <div className='container'>
      <MyDraggable/>
    </div>
  );
};

export default App;