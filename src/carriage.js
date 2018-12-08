import React from 'react';
import carriage from './img/carriage.jpg';
import {DragSource} from 'react-dnd';

const cardSource = {
  beginDrag(props, monitor, component) {
  	console.log("dragging carriage");
    // Return the data describing the dragged item
    const item = { comp: "carriage" };
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

class Carriage extends React.Component{
	render() {
		const { isDragging, connectDragSource } = this.props;
		return connectDragSource(<img id="carriage" src={carriage} />);
	}
}

export default DragSource("carriage", cardSource, collect)(Carriage);