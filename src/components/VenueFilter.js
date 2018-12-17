import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/venue-filter.css';

export default class VenueFilter extends Component {
  static propTypes = {
    venueName: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.node,
    toggleActive: PropTypes.func,
  };

  render() {
    return (
      <label
        htmlFor={this.props.venueName}
        className={`venue-filter ${this.props.venueName} ${
          this.props.active ? 'active' : ''
        }`}
      >
        {this.props.children}
        <input
          type="checkbox"
          name="venue-filter"
          id={this.props.venueName}
          checked={this.props.active}
          onChange={() => this.props.toggleActive(this.props.venueName)}
        />
      </label>
    );
  }
}
