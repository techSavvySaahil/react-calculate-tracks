import React from 'react';
import loco from './img/loco.jpg';
import {DragSource} from 'react-dnd';

const compSource = {
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { comp: "loco" };
    return item;
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Loco extends React.Component{
	render() {
		const { isDragging, connectDragSource } = this.props;
		return connectDragSource(<img id="loco" src={loco} />);
	}
}

export default DragSource("loco", compSource, collect)(Loco);