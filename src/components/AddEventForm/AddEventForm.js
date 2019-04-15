import React from 'react';
import './style.css';

class AddEventForm extends React.Component {
    state = {

    };

    onClick = event => {
        event.stopPropagation();
    };

    render() {
        return (
            <div className={`event-form event-form--${this.props.position}`} onClick={this.onClick}>
                <input type="text" className="event-form_input" name="title" placeholder='Событие'/>
                <input type="text" className="event-form_input" name="names" placeholder='Имена участников'/>
                <textarea className="event-form_input event-form_textarea" name="description" placeholder="Описание"></textarea>

                <div className="event-form-buttons">
                    <button>Готово</button>
                    <button>Удалить</button>
                </div>
            </div>
        )
    }
};

export default AddEventForm;