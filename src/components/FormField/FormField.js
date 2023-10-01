import './FormField.css';

const FormField = ({ label, error, name, type, ...rest }) => {
    return (
        <div className='formfield'>
            <label className='formfield__label'>{label}</label>
            <input
                className='formfield__input'
                name={name}
                type={type}
                {...rest}
            />
            <span className='formfield__error'>{error}</span>

        </div>
    )
}

export default FormField;