import React from 'react'
import { ChatLeftHeart } from 'react-bootstrap-icons'

export default function Brand() {
    return (
        <span>
            AnLover
            <ChatLeftHeart color="red" />
            <small className="mx-1 fs-6 text-muted"><em>v0.1.0</em></small>
        </span>
    )
}
