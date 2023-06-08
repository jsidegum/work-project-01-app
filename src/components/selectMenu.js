import React from 'react';
import { Form } from 'react-bootstrap';

const SelectMenu = ({ lista, value, onChange }) => {
    return (
        <div className="position-relative">
            <Form.Select className="form-select-arrow" value={value} onChange={onChange}>
                {lista.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};

export default SelectMenu;
