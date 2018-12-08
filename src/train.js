import React from 'react';
import { DropTarget } from 'react-dnd';
import carriage from './img/carriage.jpg';
import loco from './img/loco.jpg';

const dropTarg = {
  canDrop(props, monitor) {
  	const item = monitor.getItem();
    let check = props.checkDrop(props, item);
    return check;
  },
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    if(item.comp === "loco") {
    	props.updateTrain("loco", component);
    }
    else if(item.comp === "carriage") {
    	props.updateTrain("carriage", component);
    }

    // props.makeNewTrain(item.comp);

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

class Train extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			arrivalTime: "",
			departureTime: ""
		};
		var that = this;
		this.calculateComp = ()=> {
			if(that.props.loco) {
				that.state.locos = Array.from(new Array(that.props.loco).keys());
			}
			else {
				that.state.locos = [];
			}
			if(that.props.carriage) {
				that.state.cars = Array.from(new Array(that.props.carriage).keys());
			}
			else {
				that.state.cars = [];
			}
		};
		this.updateTimings = (e) => {
			let flag = e.target.className.includes("arrival");
			let time = e.target.value;
			let index = this.props.index;
			this.props.updateTrainTime(flag, time, index);
		}
	}
	render() {
		this.calculateComp();
		const { isOver, canDrop, connectDropTarget } = this.props;
		return connectDropTarget(
			<div>
			Train Number {this.props.index+1} <br />
				<div className="built-train">
					{
						this.state.locos.map((elem, index)=> {
							return(<img key={index} src={loco} />);
						})
					}
					{
						this.state.cars.map((elem, index)=> {
							return(<img key={index} src={carriage} />);
						})

					}
				</div>
				<div className="timings">
					<input className="arrival input" type="number" disabled={(!this.props.loco || !this.props.carriage)} defaultValue={this.state.arrivalTime} onChange={this.updateTimings} placeholder="Arrival Time(eg. 10.15)" />
					<input className="departure input" type="number" disabled={(!this.props.loco || !this.props.carriage)} defaultValue={this.state.departureTime} onChange={this.updateTimings} placeholder="Departure Time(eg. 14.20)" />
				</div>
			</div>
		);
	}
}

export default DropTarget(["loco","carriage"], dropTarg, collect)(Train);
