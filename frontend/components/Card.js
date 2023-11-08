const { Button } = require("./Button");

function Card ({ title, subtitle, text, className, image = "", buttonText = "", headerText = "", onClick, onClickButton, children, buttonClass= "" }) {

    return (
        <>
            <div className={`card global-text shadow border-0 ${onClick ? 'hover-button' : ''} ${className}`} role={onClick ? "button" : ""}>
                <div className="bg-primary px-2 rounded"></div>
                {headerText && <div className="card-header">{headerText}</div>}
                <div className="card-body">
                    {image && title && <div className="row align-items-center">
                        {image && <div className="col-md-2">{image}</div>}
                        {title && <div className="text-primary col-md-10 pt-3" style={{ fontWeight: 'bold' , fontSize: '30px'}}>{title}</div>}
                    </div>}
                    {title && !image && <div className="text-primary col-md-10" style={{ fontWeight: 'bold' , fontSize: '30px'}}>{title}</div>}
                    <hr />
                    {subtitle && <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>}
                    {text && <h8 className="card-text">{text}</h8>}
                    {children}
                    {buttonText && <Button onClick={onClickButton} text={buttonText} variant="md" className={`ms-auto ${buttonClass}`} />}
                </div>
            </div>
        </>
    )
}

module.exports = {
    Card
}