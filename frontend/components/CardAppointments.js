import React from 'react';
import { Button } from "../components/Button";  

function Card({ title, subtitle, text, className, image, buttonText, onClickButton, children, buttonTrue }) {
    return (
        <div className={`card ${className}`}>
            {image && <img src={image} alt={title} className="card-img-top" />}
            <div className="card-body">
                {title && <h5 className="card-title">{title}</h5>}
                {subtitle && <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>}
                {text && <p className="card-text">{text}</p>}
                {children}
                {buttonTrue && 
                    <Button onClick={onClickButton} className="btn btn-primary">
                        {buttonText}
                    </Button>
                }
            </div>
        </div>
    );
}

export default Card;
