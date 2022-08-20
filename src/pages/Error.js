import React from 'react'

export default function Error({ statusCode, message }) {
    return (
        <div className="d-flex justify-content-center align-items-center" id="code">
            <h1 className="me-3 pe-3 align-top border-end d-inline-block align-content-center">
                {statusCode || "Error"}
            </h1>
            <div className="d-inline-block align-middle">
                <h2 className="font-weight-normal lead" id="message">{message || "Oops... An error occured"}</h2>
            </div>
        </div>
    )
}

