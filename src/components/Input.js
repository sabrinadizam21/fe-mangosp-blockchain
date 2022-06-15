import React from 'react'
import './Input.css'

const TYPES = ['text', 'email', 'password']

export const Input = ({
    type,
    name,
    id,
    placeholder,
    value,
    onChange,
    label,
    htmlFor,
    maxLength,
    minLength,
    onBlur
}) => {
    const checkInputType = TYPES.includes(type) ? type : TYPES[0]
    return(
        <>
            <div className="label-form">
                <label htmlFor={htmlFor}>{label}<span style={{color: 'red'}}>*</span></label>
            </div>
            <input className={`input ${checkInputType}`} type={type} name={name} id={id} 
            placeholder={placeholder} value={value} onChange={onChange} 
            maxLength={maxLength} minLength={minLength} onBlur={onBlur} required />
        </>
    )
}
