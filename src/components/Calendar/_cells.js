import React from 'react';
import dateFns from "date-fns";
import format from '../../lib/format';
import Cell from './_cell';

class Cells extends React.Component {
    state = {
        events: {
            ev_6_4_2019: {
                title: 'test',
                'date': {
                    day: 6,
                    month: 4,
                    year: 2019
                },
                people: "Test, Testov",
                description: "test description"
            }
        }
    };

    getEventKey = day => `ev_${format(day, "D")}_${format(day, "M")}_${format(day, "YYYY")}`;
    getDayKey = day => `day_${format(day, "D")}_${format(day, "M")}_${format(day, "YYYY")}`;

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
                        formattedDate={formattedDate}
                        isSelected={isSelected}
                        onClick={() => {
                            this.props.onDateClick(dateFns.parse(cloneDay));
                        }}
                        hasEvent={hasEvent}
                        event={hasEvent ? this.state.events[this.getEventKey(day)] : null}
                        dayNumber={i}
                        active={this.getDayKey(day) === this.props.state.activeCellKey}
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