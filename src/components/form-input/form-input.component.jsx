import './form-input.styles.scss'

const FormInput = ({label, ...otherProps }) => {
    return(
        <div className="group">
        <input className="form-input" {...otherProps }/>
            { //if label exist- render the label
                label && ( 
                    <label 
                        className={`${
                            otherProps.value.length ? 'shrink':null} form-input-label`} >{label}
                    </label>
                    )
            }
        </div>
    )
}

export default FormInput;

// ...otherProps= 
            // type="text" 
            // required 
            // onChange={handleChange} 
            // name="displayName" 
            // value={displayName}

// * if the lenght of the input is bigger than 0, use classname 'shrink' otherwise nothing.