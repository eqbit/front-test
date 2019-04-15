import React from 'react';
import AddEventForm from '../AddEventForm/AddEventForm';

class Cell extends React.Component {
    renderTitle = () => this.props.event && this.props.event.title && <div className="calendar-body-row-cell__event-title">{this.props.event.title}</div>;

    renderPeople = () => this.props.event && this.props.event.people && <div className="calendar-body-row-cell__event-people">{this.props.event.people}</div>;

    render() {
        return (
            <div
                className={`calendar-body-row-cell ${this.props.isSelected ? "selected" : ""} ${this.props.hasEvent ? "with-event" : ""}`}
                onClick={this.props.onClick}
            >
                <div className="calendar-body-row-cell__number">{this.props.formattedDate}</div>
                {this.renderTitle()}
                {this.renderPeople()}
                {this.props.active && <AddEventForm position={this.props.dayNumber > 3 ? 'left' : 'right'}/>}
            </div>
        )
    }
};

export default Cell;