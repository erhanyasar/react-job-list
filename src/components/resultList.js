import React from 'react';

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsList: this.props.jobsList,
      filteredJobsList: this.props.jobsList
    };
  }
// If typed search parameter fetches with any of the job title, it filters out rest of the jobs; when param totally deleted, all of the jobs shown again.
  filterJobs = (event) => {
    let filteredJobs = this.state.jobsList.filter(job => (job.title === event.target.value));

    if (filteredJobs.length) {
      this.setState({
        filteredJobsList: filteredJobs  
      });
    } else if (event.target.value === '') {
      this.setState({
        filteredJobsList: this.state.jobsList  
      });
    }
  }

  componentDidMount() {
  }

  render() {
    const filteredjobsList = this.state.filteredJobsList.map((job, index) => {
      return (
        <React.Fragment key={index}>
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
              <button type="button" className="btn btn-light btn-sm mr-2" onClick={e => this.props.editJobToggle(job)}>Edit</button>
              <button type="button" className="btn btn-light btn-sm" onClick={this.props.editJobToggle}>Delete</button>
            </div>
          </div>
        </React.Fragment>
      )
    })
    return (
      <>
        <div className="row mb-3" style={{ borderBottom: '2px solid #000' }}>
          <div className="col-2" style={{ textAlign: 'left', paddingLeft: '0px' }}>
            <h4>JOB LIST</h4>
          </div>
          <div className="offset-8 col-2 my-1" style={{ paddingRight: '0px'}}>
            <input type="text" className="form-control" name="userInput" placeholder="Search Job" onChange={e => this.filterJobs(e)}/>
          </div>
        </div>
        { filteredjobsList }
      </>
    );
  }
}