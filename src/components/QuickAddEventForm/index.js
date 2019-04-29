import React from 'react';
import dateFns from 'date-fns';
import { getMonthIndex } from '../../lib/month_name';
import './style.css';

class QuickAddEventForm extends React.PureComponent {
  onChange = e => {
    this.setState({ value: e.target.value });
  };
  
  handleSubmit = () => {
    let input = this.state.value,
      fields = input.split(','),
      date = fields[0].split(' '),
      currentDate = new Date();
    
    this.props.submitHandler(`${dateFns.format(currentDate, 'YYYY')}-${getMonthIndex(date[1])}-${date[0]}`, {
      title: fields[1].trim()
    });
    
    this.props.handleQuickFormClose();
  };
  
  render() {
    return (
      <div className='quick-event-add'>
        <div className='event-form__close' onClick={this.props.handleQuickFormClose}>
          ×
        </div>
        
        <input type='text' placeholder='5 марта, День рождения' onChange={this.onChange}/>
        <button onClick={this.handleSubmit}>Создать</button>
      </div>
    )
  }
}

export { QuickAddEventForm };