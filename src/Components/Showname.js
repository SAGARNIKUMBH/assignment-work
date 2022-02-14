import React, { Component } from "react";

export class Showname extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }
  handleClickShow = () => {};

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
        />
        {this.state.name.length < 10 ? "vaild" : "invild"}
      </div>
    );
  }
}

export default Showname;
