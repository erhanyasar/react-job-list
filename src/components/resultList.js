import React from 'react';

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsList: this.props.jobsList
    };
  }
  componentDidMount() {
  }

  render() {
    const jobsList = this.state.jobsList.map(job => {
      return (
        <>
          {/* Flex used to align items center */}
          <div className="row" style={{
            backgroundColor: `${job.color}`,
            height: '10vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
            }}
          >
            <div className="col-4">
              <p>{`${job.title}`}</p>
            </div>
            <div className="col-4">
              <p>{`${job.priority}`}</p>
            </div>
            <div className="col-4">
              <button type="button" className="btn btn-light btn-sm mr-2" onClick={this.props.editJobToggle}>Edit</button>
              <button type="button" className="btn btn-light btn-sm" onClick={this.props.editJobToggle}>Delete</button>
            </div>
          </div>
        </>
      )
    })
    return (
      <>
        <div className="row mb-3" style={{ borderBottom: '2px solid #000' }}>
          <div className="col-2" style={{ textAlign: 'left', paddingLeft: '0px' }}>
            <h4>JOB LIST</h4>
          </div>
          <div className="offset-8 col-2 my-1" style={{ paddingRight: '0px'}}>
            <input type="text" className="form-control" name="userInput" placeholder="Search Job" onChange={e => this.props.filterJobs(e)}/>
          </div>
        </div>
        { jobsList }
      </>
    );
  }
}