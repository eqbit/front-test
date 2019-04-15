import React from "react";
import dateFns from "date-fns";

import './style.css';
import Header from './_header';
import Nav from './_nav';
import Cells from './_cells';
import format from "../../lib/format";

class Calendar extends React.Component {
    state = {
        currentTime: new Date(),
        selectedDate: new Date(),
        activeCellKey: null
    };

    getDayKey = day => `day_${format(day, "D")}_${format(day, "M")}_${format(day, "YYYY")}`;

    onDateClick = day => {
        this.setState({
            selectedDate: day,
            activeCellKey: this.state.activeCellKey === this.getDayKey(day) ? null : this.getDayKey(day)
        });
    };

    nextMonth = () => {
        this.setState({
            currentTime: dateFns.addMonths(this.state.currentTime, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentTime: dateFns.subMonths(this.state.currentTime, 1)
        });
    };

    toToday = () => {
        this.setState({
            currentTime: new Date(),
            selectedDate: new Date(),
            activeCellKey: null
        })
    };
    
    handleFormClose = () => this.setState({activeCellKey: null});

    render() {
        return (
            <div className="calendar">
                <Header />
                <Nav
                    prevMonth={this.prevMonth}
                    nextMonth={this.nextMonth}
                    toToday={this.toToday}
                    currentTime={this.state.currentTime}
                />

                <Cells
                    state={this.state}
                    onDateClick={this.onDateClick}
                    handleFormClose={this.handleFormClose}
                />
            </div>
        );
    }
}

export default Calendar;