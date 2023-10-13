import './FilterCheckbox.css';

function FilterCheckbox({ onCheckbox, checked }) {

    return (
        <label className="toggle-switch">
            <input
                type="checkbox"
                checked={checked}
                onChange={onCheckbox}
                className="toggle-switch-checkbox"
            />
            <span className="toggle-switch-slider round"></span>
        </label>
    );
}

export default FilterCheckbox;

