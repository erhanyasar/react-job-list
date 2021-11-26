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

  createJob = async(jobName, priority) => {
    this.setState({
        jobToCreate: {
            id: this.state.jobsList.length + 1 + '',
            title: jobName,
            priority: priority,
            color: priority === 'Urgent' ? 'red' : priority === 'Regular' ? 'yellow' : priority === 'Trivial' ? 'blue' : ''
        }
    },() => {
      let tempArr = this.state.jobsList.slice();
      tempArr.push(this.state.jobToCreate);
      this.setState({
        jobsList: tempArr
      },() => console.log(this.state.jobsList));
    });
  }

  render() {
    return (
      <>
        <FormInput
          createJob={this.createJob}
        />
        <div className="offset-1 col-10">
          <ResultList
            jobsList={this.state.jobsList}
          />
        </div>
      </>
    );
  }
}