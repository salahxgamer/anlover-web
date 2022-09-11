import React from 'react'
import anlover_logo from '../assets/anlover_logo.svg'

export default function Brand() {
    return (
        <span>
            <img src={anlover_logo} alt="AnLover" width="20" height="20" className="mx-1" style={{ verticalAlign: "-2px" }} />
            Anlover
            <small className="mx-1 fs-6 text-muted"><em>v0.1.0</em></small>
        </span>
    )
}
