import React from "react";

const Header = props => {

    return (
        <div className="header">
            <div className="container">
                <div className="header-row">
                    <div className="header-buttons">
                        <button className="btn-blue" onClick={() => props.handleQuickAdd(true)}>Добавить</button>
                        <button className="btn-blue">Обновить</button>
                    </div>
                    <div className="header-search">
                        <img src="http://pixsector.com/cache/e7836840/av6584c34aabb39f00a10.png" alt=""/>
                        <input type="text" name='search' className="header-search__input" placeholder='Событие, дата или участник'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;