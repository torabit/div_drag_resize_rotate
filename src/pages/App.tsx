import React from 'react';
import MyDraggable from '../components/templates/MyDraggable';

const App: React.FC = () => {
  const position = [
    {x: 150, y: 150},
    {x: 300, y: 300}
  ];
  const deg = [0, 45];
  const size = [
    {height: 100, width: 100},
    {height: 200, width: 200}
  ]
  return (
    <>
      <MyDraggable
        isMovable={true}
        isResizeable={true}
        isRotatable={true}
        position={position[0]}
        size={size[0]}
        deg={deg[0]}
      />
      <MyDraggable
        isMovable={false}
        isResizeable={true}
        isRotatable={true}
        position={position[1]}
        size={size[1]}
        deg={deg[1]}
      />
    </>
  );
};

export default App;