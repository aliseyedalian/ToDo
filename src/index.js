import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class Note extends React.Component { 
  constructor(props){
      super(props);
      this.state = {
          editing : false,
          text : ""
      }
  }
  edit = () => {
      this.setState({editing: true})
  }
  save = () => {
      this.props.onChange(this.refs.newText.value , this.props.id)
      this.setState({editing: false})
  }
  cancle = () => {
    this.setState({editing: false})
}
  delete = () => {
      this.props.onRemove(this.props.id)
  }
  renderForm = () => {
      return(
          <div className="note">
            <div className="form-group row">
              <textarea ref = "newText"></textarea>    
              <div className="btn-group">
                <button onClick={this.save} className="btn btn-primary btn-sm">Save</button>
                <button onClick={() => this.cancle()} className='btn btn-primary btn-sm'>Cancle</button>
              </div>          
              
            </div>    
          </div>
      )
  }
  renderDisplay = () => {
      return(
          <div className='note' >
              <p>{this.props.children}</p>   
              <div className="btn-group">
                <button onClick = {this.edit} className="btn btn-primary btn-sm">Edit</button>                            
                <button onClick = {this.delete} className="btn btn-primary btn-sm">Delete</button>
              </div>                       
          </div>
      ) 
  }
  render(){
      if(this.state.editing){
          return this.renderForm();
      }else{
          return this.renderDisplay();
      }
  }
}

class Board extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          notes: []
      }
  }
  nextId = () => {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  }
  add = (text) => {
      var notes = [
          ...this.state.notes, { id: this.nextId(),note: text }                    
      ]
      this.setState({notes})
  }
  update = (newText, id) => {
      var notes = this.state.notes.map(
          note => (note.id !== id)?note:{...note, note: newText}
      )
      this.setState({notes})
  }
  remove = (id) => {
      var notes = this.state.notes.filter(note => note.id !== id)
      this.setState({notes})
  }
  eachNote = (note) => {
      return (<Note key={note.id} id={note.id} onChange={this.update} onRemove={this.remove}>
          {note.note}
          </Note>
      )
  }
  render(){
      return(
          <div className="board"> 
              {this.state.notes.map(this.eachNote)}
              <div className="btnnew">
                <button onClick={() => this.add()} className='btn btn-primary btn-sm' style={{}}>New</button> 
              </div>                            
          </div>
      )
  }
}
ReactDOM.render(<Board/> , document.getElementById('root'))
