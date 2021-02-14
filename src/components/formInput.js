import React from 'react';

export default class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        priorities: []
    };
  }

  async componentDidMount() {
    this.searchInput.focus(); // To focus on input field on opening

    await fetch('http://localhost:4000/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          priorities: data
          });
        });
  }

  render() {
    const prioritySelectbox = this.state.priorities.map((priority, index) => {
        return (
            <option key={index} label={priority.name} value={priority.id} />
        )
    })
    return (
      <>
        <div className="offset-2 col-8 my-5">
          <div className="row">
            <div className="col-8">
                <div className="col-1">
                    <label>Job:</label>
                </div>
                <input type="text" className="form-control" name="jobNameInput" placeholder="Job" ref={e => (this.searchInput = e)} onChange={e => this.props.onInputChange(e)} maxLength='70'/>
            </div>
            <div className="col-8 my-2">
                <div className="col-1">
                    <label>Priority:</label>
                </div>
                <select className="form-control" name="priorityInput" onChange={e => this.props.onInputChange(e)}>
                    <option value="" disabled selected hidden>Priority</option>
                    { prioritySelectbox }
                </select>
            </div>
            <div className="col-12 my-2">
                <div className="col-2" style={{ paddingLeft: '0px'}}>
                    {/* Colorful button prefered in sake of UX for main CTA button even it might be a bad point from the vision of technical interviewee */}
                    <button type="button" className="btn btn-primary btn-block" onClick={e => this.props.createJob()} disabled={this.props.isValid()}>Create</button>
                </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}