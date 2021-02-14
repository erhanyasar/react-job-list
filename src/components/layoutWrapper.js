import React from 'react';
import {
    Modal,
    ModalBody
  } from 'reactstrap';import FormInput from './formInput';
import ResultList from './resultList';

export default class LayoutWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editJobModal: false,
        jobToEdit: {},
        jobToCreate: {},
        priorities: [ // TODO: Will be set to be called from the Node.js API
            { id: "1", name: "Urgent", color: "red" },
            { id: "2", name: "Regular", color: "yellow" },
            { id: "3", name: "Trivial", color: "blue" }
        ],
        jobsList: [
            { id: "1", title: "slkjdf", priority: "Urgent", color: "red" },
            { id: "2", title: "ksdj", priority: "Regular", color: "yellow" },
            { id: "3", title: "slkdajf", priority: "Trivial", color: "blue" }
        ]
    };
  }

  onInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  editJobToggle = (job) => {
      this.setState({
        editJobModal: !this.state.editJobModal
      })
      if (job.id) {
          this.setState({
            jobToEdit: job
          },() => console.log(this.state))
      }
  }

  isValid = () => { // By disabling the 'Create Button' on default, user forced to type or select inputs so that half-validation gained.
    let isSuccessfulParam = true;
    let regExp = /qwertyuioplkjhgfdsazxcvbnm/; // TODO: Not a successful regExp check for English letters but, will find more appropriate

    if (this.state.priorityInput && this.state.jobNameInput && (!regExp.test(this.state.jobNameInput))){
        isSuccessfulParam = false;
    }
    return isSuccessfulParam;
  }

  createJob = async() => {
    this.setState({
        jobToCreate: {
            id: this.state.jobsList.length,
            title: this.state.jobNameInput,
            priority: this.state.priorityInput,
            color: "red"
        }
    },() => console.log(this.state.jobToCreate));
    if (!this.isValid()) {
        let tempArr = this.state.jobsList;
        tempArr.push(this.state.jobToCreate);
        this.setState({
            jobsList: tempArr
        },() => console.log(this.state.jobsList));
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          priorities: data
          });
        });
  }

  render() {
    return (
      <>
        <FormInput
            priorities={this.state.priorities}
            onInputChange={this.onInputChange}
            isValid={this.isValid}
            createJob={this.createJob}
            filter={this.filterJobs}
        />
        <div className="offset-1 col-10">
            <ResultList
                jobsList={this.state.jobsList}
                editJobToggle={this.editJobToggle}
            />
        </div>
        <Modal isOpen={this.state.editJobModal} toggle={this.editJobToggle}>
            <ModalBody>
                <button className="offset-11 col-1" onClick={this.editJobToggle}>x</button>
                <h3>{this.state.jobToEdit.name}</h3>
                <button className="offset-5 col-2" onClick={this.editJobToggle}>Update</button>
            </ModalBody>
        </Modal>
      </>
    );
  }
}