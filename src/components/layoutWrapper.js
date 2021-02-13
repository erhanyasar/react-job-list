import React from 'react';
import FormInput from './formInput';
import ResultList from './resultList';

export default class LayoutWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        priorities: [ // TODO: Will be set to be called from the Node.js API
            { id: "1", name: "Urgent" },
            { id: "2", name: "Regular" },
            { id: "3", name: "Trivial" }
        ]
    };
  }

  onInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    }, () => console.log(this.state));
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

  }

  searchJob = async() => {

  }

  render() {
    return (
      <>
        <FormInput
            priorities={this.state.priorities}
            onInputChange={this.onInputChange}
            isValid={this.isValid}
            submitSearch={this.submitSearch}
        />
        <ResultList />
      </>
    );
  }
}