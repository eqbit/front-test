import React from 'react';
import format from '../../lib/format';
import { getMonthName } from '../../lib/month_name';
import './style.css';

class AddEventForm extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      edit: false,
      title: this.props.event && this.props.event.title ? this.props.event.title : '',
      people: this.props.event && this.props.event.people ? this.props.event.people : '',
      description: this.props.event && this.props.event.description ? this.props.event.description : ''
    }
  };
  
  onClick = event => {
    event.stopPropagation();
  };
  
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  enableEdit = name => {
    this.setState({ edit: name });
  };
  
  renderTitle = (event, edit) => {
    if (event && event.title && edit !== 'title') {
      return (
        <div
          className='event-form__event-title'
          title='редактировать'
          onClick={() => this.enableEdit('title')}>
          {this.state.title ? this.state.title : event ? event.title : null}
        </div>
      )
    } else {
      return (
        <input type='text'
               className='event-form__input' name='title'
               onChange={this.handleInputChange} placeholder='Событие'
               value={this.state.title}
        />
      )
    }
  };
  
  renderPeople = (event, edit) => {
    if (event && event.people && edit !== 'people') {
      return (
        <div
          className='event-form-event-people'
          title='редактировать'
          onClick={() => this.enableEdit('people')}
        >
          <div className='eqvent-form-event-people__top'>Участники:</div>
          <div className='eqvent-form-event-people__bottom'>
            {this.state.people
              ? this.state.people
              : event ? event.people : null}
          </div>
        </div>
      )
    } else {
      return (
        <input
          type='text'
          className='event-form__input'
          name='people'
          onChange={this.handleInputChange}
          placeholder='Имена участников'
          value={this.state.people}
        />
      )
    }
  };
  
  renderDescription = (event, edit) => {
    if (event && event.description && edit !== 'description') {
      return (
        <div
          className='event-form-event-description'
          title='редактировать'
          onClick={() => this.enableEdit('description')}
        >
          <div className='eqvent-form-event-description__top'>Подробно:</div>
          <div
            className='eqvent-form-event-description__bottom'>{event.description}</div>
        </div>
      )
    } else {
      return (
        <textarea
          className='event-form_input event-form__textarea'
          name='description'
          onChange={this.handleInputChange}
          placeholder='Описание'
          value={this.state.description}
        />
      )
    }
  };
  
  renderButtonSend = (day) => {
    return (
      <button onClick={() => {
        this.props.submitHandler(day, this.state);
        this.setState({ edit: false });
      }}>
        Готово
      </button>
    )
  };
  
  renderButtonDelete = (day) => {
    return (
      <button onClick={() => {
        this.props.deleteHandler(day);
        this.setState({
          title: '',
          people: '',
          description: ''
        })
      }}>
        Удалить
      </button>
    )
  };
  
  renderDate = day => <div
    className='event-form__date'>{format(day, 'D')} {getMonthName(format(day, 'M'))}</div>
  
  renderClose = () => {
    return (
      <div className='event-form__close'
           onClick={this.props.handleFormClose}>
        ×
      </div>
    )
  };
  
  render() {
    const { hasEvent, day, event } = this.props;
    const { edit } = this.state;
    const {
      renderTitle,
      renderPeople,
      renderDescription,
      renderButtonSend,
      renderButtonDelete,
      renderDate,
      renderClose
    } = this;
    
    return (
      <div className={`event-form event-form--${this.props.position}`}
           onClick={this.onClick}>
        
        {renderClose()}
        
        {renderTitle(event, edit)}
        
        {hasEvent && renderDate(day)}
        
        {renderPeople(event, edit)}
        
        {renderDescription(event, edit)}
        
        <div className='event-form-buttons'>
          {(edit || !hasEvent || !event.title || !event.people || !event.description) && renderButtonSend(day)}
          {hasEvent && renderButtonDelete(day)}
        </div>
      
      </div>
    )
  }
}

export { AddEventForm };