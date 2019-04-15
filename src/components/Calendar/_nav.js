import React from "react";
import format from '../../lib/format';

const Nav = props => {
    const dateFormat = "MMMM YYYY";

    return (
        <div className="container nav">
            <button onClick={props.prevMonth}>&#8249;</button>
            <div className="nav-current">{format(props.currentTime, dateFormat)}</div>
            <button onClick={props.nextMonth}>&#8250;</button>
            <div className="nav-to-today">
                <button onClick={props.toToday}>Сегодня</button>
            </div>
        </div>
    );
};

export default Nav;