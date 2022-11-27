import merge from "lodash/merge";
import React, { Component, PureComponent } from "react";
import * as alpha from "../../helpers/alpha";

import Checkboard from "./Checkboard";

export class Alpha extends (PureComponent || Component) {
  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = (e) => {
    const change = alpha.calculateChange(
      e,
      this.props.hsl,
      this.props.direction,
      this.props.a,
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

  unbindEventListeners = () => {
    window.removeEventListener("mousemove", this.handleChange);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  render() {
    const rgb = this.props.rgb;

    const styles = merge(
      {
        alpha: {
          position: "absolute",
          inset: "0px",
          borderRadius: this.props.radius,
        },
        checkboard: {
          position: "absolute",
          inset: "0px",
          overflow: "hidden",
          borderRadius: this.props.radius,
        },
        gradient: {
          position: "absolute",
          inset: "0px",
          background:
            this.props.direction === "vertical"
              ? `linear-gradient(to bottom, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
            rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`
              : `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
           rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
          boxShadow: this.props.shadow,
          borderRadius: this.props.radius,
        },
        container: {
          position: "relative",
          height: "100%",
          margin: "0 3px",
        },
        pointer: {
          position: "absolute",
          left: this.props.direction === "vertical" ? 0 : `${rgb.a * 100}%`,
          top:
            this.props.direction === "vertical" ? `${rgb.a * 100}%` : undefined,
        },
        slider: {
          width: "4px",
          borderRadius: "1px",
          height: "8px",
          boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
          background: "#fff",
          marginTop: "1px",
          transform: "translateX(-2px)",
        },
      },
      this.props.style
    );

    return (
      <div style={styles.alpha}>
        <div style={styles.checkboard}>
          <Checkboard renderers={this.props.renderers} />
        </div>
        <div style={styles.gradient} />
        <div
          style={styles.container}
          ref={(container) => (this.container = container)}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange}
          onTouchStart={this.handleChange}
        >
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

export default Alpha;
