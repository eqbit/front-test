import React from 'react';
import AddEventForm from '../AddEventForm/AddEventForm';

class Cell extends React.Component {
    renderTitle = () => this.props.event && this.props.event.title && <div className="calendar-body-row-cell__event-title">{this.props.event.title}</div>;

    renderPeople = () => this.props.event && this.props.event.people && <div className="calendar-body-row-cell__event-people">{this.props.event.people}</div>;

    render() {
        const {isSelected, hasEvent, formattedDate, event} = this.props;
        
        return (
            <div
                className={`calendar-body-row-cell ${isSelected ? "selected" : ""} ${hasEvent ? "with-event" : ""}`}
                onClick={this.props.onClick}
            >
                <div className="calendar-body-row-cell__number">{formattedDate}</div>
                
                {this.renderTitle()}
                {this.renderPeople()}
                
                {
                    this.props.active &&
                    <AddEventForm
                        submitHandler={this.props.submitHandler}
                        deleteHandler={this.props.deleteHandler}
                        handleFormClose={this.props.handleFormClose}
                        day={this.props.day}
                        position={this.props.dayNumber > 3 ? 'left' : 'right'}
                        hasEvent={hasEvent}
                        event={event}
                    />
                }
            </div>
        )
    }
};

export default Cell;