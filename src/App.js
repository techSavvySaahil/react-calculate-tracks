import React, { Component } from 'react';
import './styles/App.css';
import Loco from './loco';
import Carriage from './carriage';
import NewTrain from './newTrain';
import Train from './train'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  constructor() {
    super();
    this.state = {trainArr: [], maxTracks:0};
    let that = this;
    this.newTrainCB = (comp)=> {
      let arr = this.state.trainArr;
      if(comp === "loco") {
        // make a new train with loco
        arr.push({
          loco:1,
          carriage:0
        });
      }
      else {
        // make a new train with carriage
        arr.push({
          loco:0,
          carriage:1
        });
      }
      this.setState({trainArr: arr});
    };
    this.checkDrop = (props, item)=> {
      if(item.comp === "loco") {
        if(props.loco) {
          return false;
        }
        else {
          return true;
        }
      }
      else if(item.comp === "carriage") {
        if(props.carriage >1) {
          return false;
        }
        else {
          return true;
        }
      }
    };
    this.updateTrain = (item, component)=> {
      let props = component.props;
      let state = component.state;
      let index = props.index;
      let arr = that.state.trainArr;
      arr[index][item]++;
      that.setState({trainArr: arr});
    };
    this.updateTrainTime = (arrival, time, index) => {
      if(index+1) {
        let key = arrival ? "arrival" : "departure";
        let arr = that.state.trainArr;
        arr[index][key] = parseFloat(parseFloat(time).toFixed(2));
        that.setState({trainArr: arr});
      }
    };
    this.calculateTracks = ()=> {
      let maxTracks = 0, tracks = 0, flag;
      let tracksArr = [];
      that.state.trainArr.some((elem, index)=> {
        if(!elem.arrival || !elem.departure) {
          alert(`All the trains should have arrival as well as departure timings. Please check Train number ${index+1}`);
          flag = true;
          return flag;
        }
        if(elem.arrival >= elem.departure) {
          alert(`The arrival time should be before the departure time. Please check Train number ${index+1}.`);
          flag = true;
          return flag
        }
        tracksArr.push({time:elem.arrival, arrival:true});
        tracksArr.push({time:elem.departure, arrival:false});
      });
      if(flag) {
        return;
      }
      tracksArr.sort((a,b)=> {
        if(a.time !== b.time) { return a.time-b.time}
        else {
          if(a.arrival) {
            return -1;
          }
          else {
            return 1;
          }
        }
      });
      tracksArr.forEach((elem)=> {
        if(elem.arrival) {
          tracks++;
        }
        else {
          tracks--;
        }
        if(tracks > maxTracks) {
          maxTracks = tracks;
        }
      });
      this.setState({maxTracks:maxTracks});
    }
  }
  render() {
    return (
      <div className="App">
        <div className="app-info">Check the number of tracks required for a station</div>
        <div className="new-comp">Drag these components to build a new train or upgrade an existing one:<br /><br />
        <Loco /><br />
        Locomotive<br/><br/>
        <Carriage /><br />
        Carriage
        </div>
        <div className="train-area">
          <NewTrain makeNewTrain={this.newTrainCB} text="Drag and Drop here for new trains" />
          <span className="build-info">*Every train should have one locomotive and at least one and at most two carriages.</span><br/><br/>
          <div className="train-rows">
            {this.state.trainArr.map((train,index)=>
              <Train key={index} index={index} loco={train.loco} carriage={train.carriage} checkDrop={this.checkDrop} updateTrain={this.updateTrain} updateTrainTime={this.updateTrainTime} />
            )}
          </div>
          <button onClick={this.calculateTracks}>Calculate tracks required</button>
        </div>
        <div className="max-tracks">
          <span>Maximum tracks required for this station are: </span>
          <span className="track-count">{this.state.maxTracks}</span>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);