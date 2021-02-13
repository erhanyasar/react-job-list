import React from 'react';

export default class ResultList extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <>
        <div className="row" style={{ borderBottom: '2px solid #000'}}>
          <div className="col-2">
            <h4>JOB LIST</h4>
          </div>
          <div className="offset-7 col-2 my-1">
            <input type="text" className="form-control" name="userInput" placeholder="Search Job" onChange={e => this.props.onInputChange(e)}/>
          </div>
        </div>
      </>
    );
  }
}