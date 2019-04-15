import React from 'react';
import format from '../../lib/format';
import getMonthName from '../../lib/month_name';
import './style.css';

class AddEventForm extends React.Component {
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
        this.setState({edit: name});
    };

    render() {
        const {hasEvent, day, event} = this.props;
        const {edit} = this.state;
        
        return (
            <div className={`event-form event-form--${this.props.position}`} onClick={this.onClick}>
                <div className="event-form__close" onClick={this.props.handleFormClose}>×</div>
                
                {event && event.title && edit !== "title"
                    ? <div className="event-form__event-title" title="редактировать"  onClick={() => this.enableEdit("title")}>{event.title}</div>
                    : <input type="text" className="event-form_input" name="title" onChange={this.handleInputChange} placeholder='Событие' value={this.state.title}/>
                }
                
                {hasEvent && <div className="event-form__date">{format(day, "D")} {getMonthName(format(day, "M"))}</div>}
    
                {event && event.people && edit !== "people"
                    ? <div className="event-form-event-people" title="редактировать"  onClick={() => this.enableEdit("people")}>
                        <div className="eqvent-form-event-people__top">Участники:</div>
                        <div className="eqvent-form-event-people__bottom">{event.people}</div>
                    </div>
                    : <input type="text" className="event-form_input" name="people" onChange={this.handleInputChange} placeholder='Имена участников' value={this.state.people}/>
                }
    
                {event && event.description && edit !== "description"
                    ? <div className="event-form-event-description" title="редактировать"  onClick={() => this.enableEdit("description")}>
                        <div className="eqvent-form-event-description__top">Подробно:</div>
                        <div className="eqvent-form-event-description__bottom">{event.description}</div>
                    </div>
                    : <textarea className="event-form_input event-form_textarea" name="description" onChange={this.handleInputChange} placeholder="Описание" value={this.state.description}></textarea>
                }

                <div className="event-form-buttons">
                    {(edit || !hasEvent || !event.title || !event.people || !event.description) && <button onClick={() => this.props.submitHandler(day, this.state)}>Готово</button>}
                    {hasEvent && <button onClick={() => this.props.deleteHandler(day)}>Удалить</button>}
                </div>
            </div>
        )
    }
}

export default AddEventForm;