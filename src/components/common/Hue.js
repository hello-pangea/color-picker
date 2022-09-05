import React, { Component, PureComponent } from "react";
import * as hue from "../../helpers/hue";

export class Hue extends (PureComponent || Component) {
  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = (e) => {
    const change = hue.calculateChange(
      e,
      this.props.direction,
      this.props.hsl,
      this.container
    );
    change &&
      typeof this.props.onChange === "function" &&
      this.props.onChange(change, e);
  };

  handleMouseDown = (e) => {
    this.handleChange(e);
    window.addEventListener("mousemove", this.handleChange);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseUp = () => {
    this.unbindEventListeners();
  };

  unbindEventListeners() {
    window.removeEventListener("mousemove", this.handleChange);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  render() {
    const { direction = "horizontal" } = this.props;

    const styles = {
      hue: {
        position: "absolute",
        inset: "0px",
        borderRadius: this.props.radius,
        boxShadow: this.props.shadow,
      },
      container: {
        padding: "0 2px",
        position: "relative",
        height: "100%",
        borderRadius: this.props.radius,
      },
      pointer: {
        position: "absolute",
        left:
          direction === "vertical"
            ? "0px"
            : `${(this.props.hsl.h * 100) / 360}%`,
        top:
          direction === "vertical"
            ? `${-((this.props.hsl.h * 100) / 360) + 100}%`
            : undefined,
      },
      slider: {
        marginTop: "1px",
        width: "4px",
        borderRadius: "1px",
        height: "8px",
        boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
        background: "#fff",
        transform: "translateX(-2px)",
      },
    };

    return (
      <div style={styles.hue}>
        <div
          className={`hue-${direction}`}
          style={styles.container}
          ref={(container) => (this.container = container)}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange}
          onTouchStart={this.handleChange}
        >
          <style>{`
            .hue-horizontal {
              background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
                33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to right, #f00 0%, #ff0
                17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }

            .hue-vertical {
              background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
                #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,
                #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }
          `}</style>
          <div style={styles.pointer}>
            {this.props.pointer ? (
              <this.props.pointer {...this.props} />
            ) : (
              <div style={styles.slider} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Hue;
