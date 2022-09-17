import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import SideBar from './SideBar';
import ErrorBoundary from '../components/ErrorBoundary';

export default function AppContainer({ showNavBar, showSideBar, showFooter, children }) {
    return (
        <Container fluid="true">
            {showNavBar && <NavBar />}
            <Container fluid="true">
                <Row className="flex-nowrap gx-0">
                    <Col xs="auto">
                        {showSideBar && <SideBar />}
                    </Col>
                    <Col style={{ overflowX: 'clip' }}>

                        <ErrorBoundary>
                            <Outlet />
                            {children}
                        </ErrorBoundary>

                    </Col>
                </Row>
            </Container>
            {showFooter && <Footer />}
        </Container>
    );
}

AppContainer.defaultProps = {
    showNavBar: true,
    showSideBar: true,
    showFooter: true,
};

AppContainer.propTypes = {
    showNavBar: PropTypes.bool,
    showSideBar: PropTypes.bool,
    showFooter: PropTypes.bool,
    children: PropTypes.node,
};