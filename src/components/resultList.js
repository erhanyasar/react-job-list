import React from 'react';

export default class ResultList extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <>
        <div className="row" style={{ borderBottom: '2px solid #000' }}>
          <div className="col-2" style={{ textAlign: 'left', paddingLeft: '0px' }}>
            <h4>JOB LIST</h4>
          </div>
          <div className="offset-8 col-2 my-1" style={{ paddingRight: '0px'}}>
            <input type="text" className="form-control" name="userInput" placeholder="Search Job" onChange={e => this.props.filterJobs(e)}/>
          </div>
        </div>
        <button type="button" className="btn btn-light mr-2" onClick={this.props.editJobToggle}>Edit</button>
        <button type="button" className="btn btn-light" onClick={this.props.editJobToggle}>Delete</button>
      </>
    );
  }
}