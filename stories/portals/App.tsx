import React from "react";
import Portal from "./Portal";

export class App extends React.Component {
  state = {
    pickerVisible: false,
  };

  handleToggleVisibility = () => {
    this.setState(({ pickerVisible }: any) => ({
      pickerVisible: !pickerVisible,
    }));
  };

  handleColorChange = ({ hex }) => console.log(hex);

  render() {
    return (
      <>
        <div>
          <button onClick={this.handleToggleVisibility}>Pick Color</button>

          {this.state.pickerVisible && (
            <Portal
              onChange={this.handleColorChange}
              onClose={this.handleToggleVisibility}
            />
          )}
        </div>
        <div id="root-portal"></div>
      </>
    );
  }
}

export default App;
