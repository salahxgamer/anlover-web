import React, { Component } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import API from '../utils/api';

export default class Provider extends Component {


    constructor(props) {
        super(props)
        this.state = {
            url: new URL(props.url),
            loading: true,
            name: new URL(props.url).hostname,
            urls: []
        }
    }

    componentDidMount() {
        API.fetchProvider(this.state.url.toString())
            .then(({ urls }) => this.setState({ urls }, () => this.props?.onLoad(this.state)))
            .then(() => console.log("Provider resolved :", this.state.url))
            .catch((err) => console.warn("Provider rejected :", this.state.url, err))
            .finally(() => this.setState({ loading: false }))
    }

    render() {
        return (
            <>
                <Dropdown.Divider />
                <Dropdown.Header className={this.state.loading ? "text-info" : (this.state?.urls?.length ? "text-success" : "text-warning")}>
                    {this.state.loading && <Spinner animation="grow" variant="primary" size="sm" />}
                    {`Provider : ${this.state.name}`}
                </Dropdown.Header>
                {
                    !this.state.loading && this.state.urls.map((url, index) =>
                        <Dropdown.Item key={index} onClick={() => this.props?.onSelect(this.state, index)}>
                            Quality {index + 1}
                        </Dropdown.Item>
                    )
                }
            </>
        )
    }
}

Provider.propTypes = {
    url: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
    onSelect: PropTypes.func
}