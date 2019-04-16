import React from "react";
import dateFns from "date-fns";

import './style.css';
import Header from './_header';
import Nav from './_nav';
import Cells from './_cells';
import format from "../../lib/format";

const initialState = {
    currentTime: new Date(),
    selectedDate: new Date(),
    activeCellKey: null,
    showQuickAddForm: false
};

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = initialState;
    }
    
    reset = () => {
        this.setState(initialState);
    };

    getDayKey = day => `day_${format(day, "D")}_${format(day, "M")}_${format(day, "YYYY")}`;

    onDateClick = day => {
        this.setState({
            currentTime: day,
            selectedDate: day,
            activeCellKey: this.state.activeCellKey === this.getDayKey(day) ? null : this.getDayKey(day),
            showQuickAddForm: false
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
        this.reset();
    };
    
    handleFormClose = () => {
        this.setState({
            activeCellKey: null
        });
    };
    
    handleQuickAdd = isShow => {
        this.setState({
            showQuickAddForm: isShow,
            activeCellKey: null
        });
    };

    render() {
        return (
            <div className="calendar">
                <Header
                    handleQuickAdd={this.handleQuickAdd}
                    onDateClick={this.onDateClick}
                />
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
                    showQuickAddForm={this.state.showQuickAddForm}
                    handleQuickAdd={this.handleQuickAdd}
                />
            </div>
        );
    }
}

export default Calendar;