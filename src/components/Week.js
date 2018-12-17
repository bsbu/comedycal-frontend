import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from './Day';
import PerformanceType from '../types/Performance';

export default class Week extends Component {
  static propTypes = {
    startOfWeek: PropTypes.object,
    performances: PropTypes.arrayOf(PerformanceType),
    activeVenues: PropTypes.objectOf(PropTypes.bool),
  };

  renderDay = day => {
    const thisDay = this.props.startOfWeek.clone().add(day, 'days');
    const performancesOfTheDay = this.props.performances.filter(
      performance =>
        moment(performance.dateandtime).isSameOrAfter(thisDay) &&
        moment(performance.dateandtime).isBefore(thisDay.clone().add(1, 'days'))
    );
    return (
      <Day
        key={thisDay}
        day={thisDay}
        performances={performancesOfTheDay}
        activeVenues={this.props.activeVenues}
      />
    );
  };

  render() {
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
    return (
      <div className="week">{daysOfWeek.map(day => this.renderDay(day))}</div>
    );
  }
}
