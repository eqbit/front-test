import React from "react";
import Search from '../Search/Search';

const Header = props => {

    return (
        <div className="header">
            <div className="container">
                <div className="header-row">
                    <div className="header-buttons">
                        <button className="btn-blue" onClick={() => props.handleQuickAdd(true)}>Добавить</button>
                        <button className="btn-blue">Обновить</button>
                    </div>
                    <Search onDateClick={props.onDateClick}/>
                </div>
            </div>
        </div>
    );
};

export default Header;