import React, { Component } from 'react'

import './Thermometer.css'

class Thermometer extends Component {
  render() {
    this.options = this._generateOptions()
    const theme = `thermometer--theme-${this.options.theme()}`
    const size = `thermometer--${this.options.size()}`
    const height = `${this.options.height}px`;
    const width = `${this.options.width}px`;
    const heightPercent = { height: `${this.options.percent()}%` }
    const heightBgColor = { height: `calc(${this.options.height}px - 57px)` }
    const valstr = this.options.valstr()
    this._createIntervals()
    const stepIntervals = this._createIntervalsUI(this.options.intervals)

    return (
      <div style={{height: height, width: width}} className={`thermometer ${size} ${theme}`}>
        <div className="thermometer__draw-a"></div>
        <div className="thermometer__draw-b"></div>
        <div className="thermometer__meter">
          <ul className="thermometer__statistics">{stepIntervals}</ul>
          <div style={heightPercent} className="thermometer__mercury">
            <div className="thermometer__percent-current">{valstr}</div>
            <div className="thermometer__mask">
              <div className="thermometer__bg-color" style={heightBgColor}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _generateOptions() {
    return {
      theme: () => this.props.theme === 'light' || this.props.theme === 'dark' ? this.props.theme : 'light',
      value: parseFloat(this.props.value) || 0, //default 0
      max: parseFloat(this.props.max) || 100, //default 100
      min: parseFloat(this.props.min) || 0, //default 0
      steps: this.props.steps,
      format: this.props.format || '',
      size: () => this.props.size === 'small' || this.props.size === 'normal' || this.props.size === 'large' ? this.props.size : 'normal',
      height: this.props.height || 200, //default 200
      width: this.props.width || 200,
      valstr: () => this.options.value.toFixed(4) + this.options.format,
      percent: () => ((this.options.value - this.options.min) * 100) / (this.options.max - this.options.min),
      intervals: []
    }
  }

  _createIntervals() {
    if (this.options.steps) {
      let step_value = (this.options.max - this.options.min) / this.options.steps;
      for (let step = 0; step <= this.options.steps; step++) {
        let val = this.options.min + (step_value) * step;
        let percent = ((val - this.options.min) * 100) / (this.options.max - this.options.min);
        let interval = { percent: percent, label: val + this.options.format };
        this.options.intervals.push(interval)
      }
    }
  }

  _createIntervalsUI(intervals) {
    return intervals.map((step, i) => {
      return (
        <li key={i} style={{ bottom: `calc(${step.percent}% - 1px)` }}>
          {step.label}
        </li>
      )
    })
  }

}

export default Thermometer
