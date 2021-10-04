import React from 'react';
import MyDraggable from '../components/templates/MyDraggable';

const App: React.FC = () => {
  return (
    <>
      <MyDraggable
        isMovable={true}
        isResizeable={true}
        isRotatable={true}
        position={{x: 150, y: 150}}
        size={{height: 200, width: 200}}
        deg={0}
      />
      {/* <MyDraggable
        isMovable={false}
        isResizeable={true}
        isRotatable={true}
        position={{x: 300, y: 300}}
        size={{height: 200, width: 200}}
        deg={45}
      /> */}
    </>
  );
};

export default App;