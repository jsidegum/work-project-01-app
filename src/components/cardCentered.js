import React from 'react';

const CardCentered = (props) => {
    const { title, ...restProps } = props;

    return (
        <div className="content-centered d-flex align-items-center justify-content-center" style={{ height: '70vh' }}>
            <div className="border rounded p-4 mx-auto my-auto" {...restProps}>
                {title && <h1 className="display-6 text-center border-bottom">{title}</h1>}
                {props.children}
            </div>
        </div>
    );
};

export default CardCentered;