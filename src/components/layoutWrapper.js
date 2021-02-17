import React from 'react';
import FormInput from './formInput';
import ResultList from './resultList';

export default class LayoutWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        jobToCreate: {},
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

  isValid = () => { // By disabling the 'Create Button' on default, user forced to type or select inputs so that half-validation gained.
    let isSuccessfulParam = true;
    let regExp = /qwertyuioplkjhgfdsazxcvbnm/; // TODO: Not a successful regExp check for English letters (it accepts all letters other than
                                              // special chars) but, will find more appropriate
    if (this.state.priorityInput && this.state.jobNameInput && (!regExp.test(this.state.jobNameInput))){
        isSuccessfulParam = false;
    }
    return isSuccessfulParam;
  }

  createJob = async() => {
    this.setState({
        jobToCreate: {
            id: this.state.jobsList.length + 1 + '',
            title: this.state.jobNameInput,
            priority: this.state.priorityInput,
            color: this.state.priorityInput === 'Urgent' ? 'red' : this.state.priorityInput === 'Regular' ? 'yellow' : this.state.priorityInput === 'Trivial' ? 'blue' : ''
        }
    },() => {
      if (!this.isValid()) {
        let tempArr = this.state.jobsList.slice();
        tempArr.push(this.state.jobToCreate);
        this.setState({
          jobsList: tempArr,
          filteredJobsList: tempArr
        },() => console.log(this.state.jobsList));
      };
    });
  }

  render() {
    return (
      <>
        <FormInput
          onInputChange={this.onInputChange}
          isValid={this.isValid}
          createJob={this.createJob}
          filter={this.filterJobs}
        />
        <div className="offset-1 col-10">
          <ResultList
            jobsList={this.state.jobsList}
            filteredJobsList={this.state.jobsList}
          />
        </div>
      </>
    );
  }
}