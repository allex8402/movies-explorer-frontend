import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className="toggle-switch">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
                className="toggle-switch-checkbox"
            />
            <span className="toggle-switch-slider round"></span>
        </label>
    );
}

export default FilterCheckbox;