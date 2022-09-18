import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

/**
 * Render the error page
 * @param {number} statusCode - The HTTP status code
 * @param {string} message - The error message
 */
export default function Error({ statusCode, message }) {
    return (
        <div
            style={{ minHeight: "100vh" }}
            className="d-flex justify-content-center align-items-center container"
        >
            <Helmet><title>{`Error ${statusCode} - ${message}`}</title></Helmet>
            <h1 className="pe-3" id="code">
                {statusCode || "Error"}
            </h1>
            <div className="ps-3 border-start">
                <h2 className="font-weight-normal lead" id="message">{message || "Oops... An error occured"}</h2>
                <Link to="/" className="btn btn-link btn-sm ps-0">Go back to home page</Link>
            </div>
        </div>
    )
}
