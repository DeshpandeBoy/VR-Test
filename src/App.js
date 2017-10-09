import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: "",
      filteredList: []
    };
  }

  componentDidMount() {
    fetch(
      "https://app.fyle.in/api/bank_branches?city=BANGALORE&offset=0&limit=50"
    )
      .then(result => result.json())
      .then(data => this.setState({ data }));
  }

  _handleChange(event) {
    this.setState({
      value: event.target.value
    });
    this._filter(event.target.value.toUpperCase(), this.state.data);
  }

  _filter(input, data) {
    let filteredList = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].bank_name.includes(input)) {
        filteredList.push(data[i]);
        this.setState({ filteredList });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div id="dropdown">
          <select>
            {this.state.data.map((bank, i) => (
              <option key={i}>{bank.city}</option>
            ))}
          </select>
          <div id="search">
            <input onChange={e => this._handleChange(e)} />
          </div>
          <div id="table">
            <table className="table-striped table-hover">
              <thead className="thead-inverse">
                <th>IFSC</th>
                <th>Bank Name</th>
                <th>Branch</th>
                <th>Address</th>
                <th>City</th>
                <th>District</th>
                <th>State</th>
              </thead>
              <tbody>
                {this.state.value.length !== 0
                  ? this.state.filteredList.map((bank, i) => (
                      <tr key={i}>
                        <td>{bank.ifsc}</td>
                        <td>{bank.bank_name}</td>
                        <td>{bank.branch}</td>
                        <td>{bank.address}</td>
                        <td>{bank.city}</td>
                        <td>{bank.district}</td>
                        <td>{bank.state}</td>
                      </tr>
                    ))
                  : this.state.data.map((bank, i) => (
                      <tr key={i}>
                        <td>{bank.ifsc}</td>
                        <td>{bank.bank_name}</td>
                        <td>{bank.branch}</td>
                        <td>{bank.address}</td>
                        <td>{bank.city}</td>
                        <td>{bank.district}</td>
                        <td>{bank.state}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
