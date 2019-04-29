import React from 'react';
import './style.css';
import { getStoredEvents, isInclude } from '../../lib/functions';
import { getMonthName } from '../../lib/month_name';

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      value: '',
      results: []
    }
  };
  
  onChange = e => {
    this.getResults(e.target.value);
  };
  
  clearSearch = () => {
    this.setState({
      value: ''
    })
  };
  
  getResults = input => {
    const events = getStoredEvents();
    let results = [];
    
    for (let key in events) {
      if (!events.hasOwnProperty(key)) continue;
      
      const item = events[key];
      
      if (
        isInclude(item.title, input)
        ||
        (item.description && isInclude(item.description, input))
        ||
        (item.people && isInclude(item.people, input))
        ||
        (item.date &&
          (isInclude(item.date.day, input) || isInclude(item.date.month, input) || isInclude(getMonthName(item.date.month), input) || isInclude(item.date.year, input)))
      ) {
        results.push({
          title: item.title,
          date: `${item.date.day} ${getMonthName(item.date.month)}`,
          dayToGo: `${item.date.year}-${item.date.month}-${item.date.day}`
        });
      }
    }
    
    this.setState({
      value: input,
      results: results
    });
  };
  
  renderResults = results => {
    return (
      <div className='header-search-results'>
        {
          !results.length
            ? <div className='header-search-results__empty'>Ничего не найдено</div>
            : results.map(item => {
              return (
                <div
                  key={item.date}
                  className='header-search-results-item'
                  onClick={() => this.props.onDateClick(item.dayToGo)}
                >
                  <div
                    className='header-search-results-item__title'>{item.title}</div>
                  <div
                    className='header-search-results-item__date'>{item.date}</div>
                </div>
              )
            })
      
        }
      </div>
    )
  };
  
  
  render() {
    const { results } = this.state;
    return (
      <div className='header-search'>
        <div className='header-search__icon'>Поиск</div>
        <input
          type='text'
          name='search'
          className='header-search__input'
          placeholder='Событие, дата или участник'
          autoComplete='off'
          onChange={this.onChange}
          value={this.state.value}
        />
        {this.state.value && <div className='header-search__clear' onClick={this.clearSearch}>×</div>}
        
        {this.state.value && this.renderResults(results)}
      </div>
    );
  }
}

export { Search };