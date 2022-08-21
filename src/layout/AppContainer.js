import React from 'react'
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function AppContainer({ children }) {
    return (
        <Container fluid="true">
            <NavBar />
            <Container>
                <Outlet />
                {children}
            </Container>
        </Container>
    )
}
