import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Performance from './Performance';
import PerformanceType from '../types/Performance';

import '../css/day.css';

export default class Day extends Component {
  static propTypes = {
    day: PropTypes.object,
    performances: PropTypes.arrayOf(PerformanceType),
    activeVenues: PropTypes.objectOf(PropTypes.bool),
  };

  render() {
    return (
      <div
        className={`day ${
          this.props.day.isSame(moment(), 'day') ? 'current-day' : ''
        }`}
      >
        <p className="title">{this.props.day.format('dddd, MMM Do')}</p>
        <div className="performances">
          {this.props.performances
            .sort((lhs, rhs) => lhs.dateandtime > rhs.dateandtime)
            .map(performance => (
              <Performance
                key={Math.random()}
                performance={performance}
                venueActive={
                  this.props.activeVenues[
                    performance.venue.toLowerCase().replace(' ', '-')
                  ]
                }
              />
            ))}
        </div>
      </div>
    );
  }
}
