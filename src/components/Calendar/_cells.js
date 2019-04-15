import React from 'react';
import dateFns from "date-fns";
import format from '../../lib/format';
import Cell from './_cell';

const initEvents = JSON.parse(localStorage.getItem("events"));

class Cells extends React.Component {
    state = {
        events: initEvents
    };

    getEventKey = day => `ev_${format(day, "D")}_${format(day, "M")}_${format(day, "YYYY")}`;
    
    getDayKey = day => `day_${format(day, "D")}_${format(day, "M")}_${format(day, "YYYY")}`;
    
    getDate = day => {
        return {
            day: format(day, "D"),
            month: format(day, "M"),
            year: format(day, "YYYY")
        }
    };
    
    addEvent = (day, event) => {
        const {events} = this.state;
        
        if(!event || !event.title) {
            console.log("no data");
            return;
        }
        
        const newEvent = {
            title: event.title,
            date: this.getDate(day),
            people: event.people,
            description: event.description
        };
        
        events[this.getEventKey(day)] = newEvent;
        
        localStorage.setItem("events", JSON.stringify(events));
        this.setState({events});
    };
    
    submitHandler = (day, data) => {
        this.addEvent(day, data);
    };
    
    deleteHandler = (day) => {
        const {events} = this.state;
    
        delete events[this.getEventKey(day)];
    
        localStorage.setItem("events", JSON.stringify(events));
        this.setState({events});
    };

    render() {
        const { currentTime, selectedDate } = this.props.state;
        const monthStart = dateFns.startOfMonth(currentTime);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        let rows = [];
        let days = [];

        let day = startDate;
        let formattedDate = "";

        let dateFormat = "dddd, D";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {

                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const isSelected = dateFns.isSameDay(day, selectedDate);
                const hasEvent = !!this.state.events[this.getEventKey(day)];

                days.push(
                    <Cell
                        key={day}
                        day={day}
                        formattedDate={formattedDate}
                        isSelected={isSelected}
                        onClick={() => {
                            this.props.onDateClick(dateFns.parse(cloneDay));
                        }}
                        hasEvent={hasEvent}
                        event={hasEvent ? this.state.events[this.getEventKey(day)] : null}
                        dayNumber={i}
                        active={this.getDayKey(day) === this.props.state.activeCellKey}
                        submitHandler={this.submitHandler}
                        deleteHandler={this.deleteHandler}
                        handleFormClose={this.props.handleFormClose}
                    />
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="calendar-body-row" key={day}>{days}</div>
            );
            days = [];
            dateFormat = "D";
        }
        return <div className="container calendar-body">{rows}</div>;
    }
}

export default Cells;