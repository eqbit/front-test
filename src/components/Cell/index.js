import React from 'react';
import { AddEventForm } from '../AddEventForm/index';

class Cell extends React.PureComponent {
  renderTitle = () => this.props.event && this.props.event.title
    && <div className='calendar-body-row-cell__event-title'>{this.props.event.title}</div>;
  
  renderPeople = () => this.props.event && this.props.event.people
    && <div className='calendar-body-row-cell__event-people'>{this.props.event.people}</div>;
  
  renderForm = (event, hasEvent) => {
    return (
      <AddEventForm
        submitHandler={this.props.submitHandler}
        deleteHandler={this.props.deleteHandler}
        handleFormClose={this.props.handleFormClose}
        day={this.props.day}
        position={this.props.dayNumber > 3 ? 'left' : 'right'}
        hasEvent={hasEvent}
        event={event}
      />
    )
  };
  
  renderDate = formattedDate => <div className='calendar-body-row-cell__number'>{formattedDate}</div>
  
  render() {
    const { isSelected, hasEvent, formattedDate, event } = this.props;
    const {
      renderTitle,
      renderPeople,
      renderForm,
      renderDate
    } = this;
    
    return (
      <div className={`calendar-body-row-cell ${isSelected ? 'calendar-body-row-cell--selected' : ''} ${hasEvent ? 'calendar-body-row-cell--with-event' : ''}`}
           onClick={this.props.onClick}
      >
        {renderDate(formattedDate)}
        {renderTitle()}
        {renderPeople()}
        {this.props.active && renderForm(event, hasEvent)}
      </div>
    )
  }
};

export { Cell };