import React, {useState} from 'react';

function Select(props) {
    const options = props.options
    const value = props.value
    const other = props.other
    const onChange = props.onChange

    const [otherSelect, setOtherSelect] = useState(false)

    const handleOnOtherClick = (e) => {
        if(e.target.value === "other")
            setOtherSelect(true)
        else
            onChange(e)
    }

    const handleOnBlurOther = (e) => {
        if(e.target.value === "")
            setOtherSelect(false)
    }

    return (
        <>
            {
                !otherSelect ?
                    (
                        <select onChange={handleOnOtherClick} className="form-select col">
                        {<option value={value} hidden>{value}</option>}
                        {options && options.map(option => <option key={option.value} value={option.value}>{option.value}</option>)}
                        {other && <option value="other">Other</option>}
                        </select>
                    ):
                    (<input type="text" onBlur={handleOnBlurOther} onChange={onChange} className="form-control col"/>)
            }

        </>
    );
}

export default Select;