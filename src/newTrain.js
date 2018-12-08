import React from 'react';
import { DropTarget } from 'react-dnd';

const dropTarg = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    console.log("item: ", item);
    console.log("State ",this.state);
    console.log("monitor ",monitor);
    console.log("props ",props);
    return true;
  },
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    console.log("props: ", props);
    const item = monitor.getItem();
    console.log("item: ", item);
    console.log("Component: ", component);

    props.makeNewTrain(item.comp);

    // You can do something with it

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class NewTrain extends React.Component{
  	render() {
		const { isOver, canDrop, connectDropTarget } = this.props;
		return connectDropTarget(<div className="drop-area">{this.props.text}</div>);
	}
}

export default DropTarget(["loco","carriage"], dropTarg, collect)(NewTrain);
