import React from 'react';
import {
  Modal,
  ModalBody,
  Row,
  Col
} from 'reactstrap';

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editJobModal: false,
      jobsList: this.props.jobsList,
      filteredJobsList: this.props.jobsList,
      jobToEdit: {}
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

  editJobToggle = (job) => {
    this.setState({
      editJobModal: !this.state.editJobModal,
      jobToEdit: job
    })
  }

  editJob = () => {
    let newJobObj = Object.assign({}, this.state.jobToEdit);
    newJobObj.priority = this.state.priorityUpdate;

    let filteredColor = this.state.priorities.filter(priority => priority.name === this.state.priorityUpdate)
    newJobObj.color = filteredColor[0].color
    
    let tempArr = this.state.jobsList.slice();
    tempArr.splice(parseInt(this.state.jobToEdit.id) - 1, 1, newJobObj);
    this.setState({
      jobsList: tempArr,
      filteredJobsList: tempArr
    },() => console.log(this.state.jobsList))

    this.editJobToggle();
  }

  deleteJob = (jobToDelete) => {
    let tempArr = this.state.filteredJobsList.filter( job => job.id != jobToDelete.id);
    this.setState({
      filteredJobsList: tempArr
    });
  }

  onInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    },() => console.log(this.state));
  }

  async componentDidMount() {
    await fetch('http://localhost:4000/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          priorities: data
          });
        });
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
              <button type="button" className="btn btn-light btn-sm mr-2" onClick={e => this.editJobToggle(job)}>Edit</button>
              <button type="button" className="btn btn-light btn-sm" onClick={e => this.deleteJob(job)}>Delete</button>
            </div>
          </div>
        </React.Fragment>
      )
    });
    const prioritySelectbox = this.state.priorities ? this.state.priorities.map((priority, index) => {
      return (
          <option key={index} label={priority.name} value={priority.name} />
      )
    })
    :
    ''
    ;
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
        <Modal isOpen={this.state.editJobModal} toggle={this.editJobToggle}>
            <ModalBody>
                <button className="offset-11 col-1" onClick={this.editJobToggle}>x</button>
                <Row className="mt-5 mb-3">
                  <Col sm={{ offset: 2, size: 8}}>
                    <p style={{ textAlign: 'center' }}>{this.state.jobToEdit ? this.state.jobToEdit.title : ''}</p>
                  </Col>
                </Row>
                <Row className="mt-3 mb-5">
                  <Col sm={{ offset: 2, size: 8}}>
                    <select className="form-control" name="priorityUpdate" onChange={e => this.onInputChange(e)}>
                      <option value="" disabled selected hidden>Priority</option>
                      { prioritySelectbox }
                    </select>
                  </Col>
                </Row>
                <Row className="my-5">
                  <button className="offset-5 col-2" disabled={!this.state.priorityUpdate || this.state.jobToEdit ? (this.state.priorityUpdate === this.state.jobToEdit.priority) : ''} onClick={this.editJob}>Update</button>
                </Row>
            </ModalBody>
        </Modal>
      </>
    );
  }
}