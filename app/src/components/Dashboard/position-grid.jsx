import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Cell from './cell';
import '../Styles/data-table.css';

const SortableItem = SortableElement(({contestant}) => 
<tr> 
  <Cell key={contestant + "-position"} content={contestant.position}/> 
  <Cell key={"photo"} content={"N/A"}/>
  <Cell key={"name"} content={contestant.name}/>
  <Cell key={"number"} content={contestant.carNumber}/>
</tr>);

const SortableList = SortableContainer(({items}) => {
  return (
      <tbody>
        {
        items.map((value, index) => (
           <SortableItem key={`contestant-${value.name}`} index={index} contestant={value} test={index + 1}/>
        ))}
      </tbody>
  );
});

class PositionGrid extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        contestants: [],
        headers:["Position", "Photo", "Name", "Car Number"]
    };
    }


    componentDidMount() {
      this.setState({ loading: true });
      // this.unsubscribe = this.props.firebase
      // .contestants('race-2019-01-01')
      // .orderBy("position")
      // .onSnapshot(snapshot => {
      //   let contestants = [];
      //   snapshot.forEach(doc =>
      //     contestants.push({ ...doc.data(), uid: doc.id }),
      //   );
      //   this.setState({
      //     contestants,
      //     loading: false,
      //   });
      // });
    }

    componentWillUnmount() {
      // this.unsubscribe();
    }

     onSortEnd = ({oldIndex, newIndex}) => {
        
      this.setState(({contestants}) => ({
        contestants: arrayMove(contestants, oldIndex, newIndex),
      }));

        this.state.contestants.forEach((item, index) => {
          this.props.firebase.contestant("race-2019-01-01", item.uid).set({
            position:index + 1
          }, {merge:true});
        });
      }

      render() {
        return <div className="table-container">
        <table className="table">
          <thead>
            {this.state.headers.map((value, index) => (
              <Cell key={"header-" + index} content={value} header={true}/>
            ))}  
          </thead>
            {this.state.loading === true ? null : <SortableList items={this.state.contestants} onSortEnd={this.onSortEnd}/> }
        </table>
        </div>
        
      }
  }  

  
export default PositionGrid