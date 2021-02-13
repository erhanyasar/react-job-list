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
        priorities: [ // TODO: Will be set to be called from the Node.js API
            { id: "1", name: "Urgent" },
            { id: "2", name: "Regular" },
            { id: "3", name: "Trivial" }
        ],
        jobs: [

        ]
    };
  }

  onInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    }, () => console.log(this.state));
  }

  editJobToggle = () => {
      this.setState({
        editJobModal: !this.state.editJobModal
      })
  }

  isValid = () => { // 'disabled={this.props.isValid()}'
    /*
    let isSuccessfulParam = true;
    Data.forEach(element => { // city.list.json on util folder used in order to success validation on the user input value of city
      if (element.name  === this.state.userInput) {
        isSuccessfulParam = false;
      }
    });
    return isSuccessfulParam;
    */
  }

  createJob = async() => {
    this.isValid();

}

  filterJobs = async() => {}

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
                jobs={this.state.jobs}
                editJobToggle={this.editJobToggle}
            />
        </div>
        <Modal isOpen={this.state.editJobModal} toggle={this.editJobToggle}>
            <ModalBody>
                <button className="offset-11 col-1" onClick={this.editJobToggle}>x</button>
                <button className="offset-5 col-2" onClick={this.editJobToggle}>Update</button>
            </ModalBody>
        </Modal>
      </>
    );
  }
}