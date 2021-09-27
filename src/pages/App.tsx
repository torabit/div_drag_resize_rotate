import React, { useRef } from 'react';
import Moveable from 'react-moveable';
import '../App.css';
import MoveableHelper from "moveable-helper";
import MyDraggable from '../components/templates/MyDraggable';

const App: React.FC = () => {
  const target = useRef<HTMLDivElement>(null);
  
  const [helper] = React.useState(() => {
    return new MoveableHelper();
  });

  return (
    <div className='container'>
      <MyDraggable/>
      <div className='target' ref={target} >div</div>
      <Moveable
        target={target}
        draggable={true}
        resizable={true}
        rotatable={true}

        onDragStart={helper.onDragStart}
        onDrag={helper.onDrag}
        onResizeStart={helper.onResizeStart}
        onResize={helper.onResize}
        onRotateStart={helper.onRotateStart}
        onRotate={helper.onRotate}
      />
    </div>
  );
};

export default App;