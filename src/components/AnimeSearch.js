
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row, ToggleButton } from 'react-bootstrap';
import { ArrowRepeat, ListTask, Search } from 'react-bootstrap-icons';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import searchOptions from '../config/searchOptions';


/**
 * @typedef {Object} Props
 * @property {Boolean} isAutoSearch - whether to search as you type
 * @property {Object} initialFilters - initial filters to use
 * @property {Function} onSearch - function to call when search is submitted
 */

/**
 * Search bar for animes
 * @component
 * @param {Props} props 
 */
export default function AnimeSearch(props) {
    const { initialFilters = {}, onSearch, isAutoSearch, ...otherProps } = props
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);
    const [showModal, setShowModal] = useState(false);
    const [autoSearch, setAutoSearch] = useState(isAutoSearch);
    const updateFilters = updatedFilters => {
        const newFilters = { ...filters, ...updatedFilters }
        setFilters(newFilters)
        autoSearch && onSearch(newFilters);
    }

    const handleSubmit = e => {
        console.log(filters)
        setShowModal(false);
        if (onSearch) {
            onSearch(filters);
        } else {
            navigate({
                pathname: "animes",
                search: createSearchParams(filters).toString()
            });
        }
        e?.preventDefault();
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const toggleAutoSearch = () => setAutoSearch(!autoSearch);



    const TemplateFilter = ({ name, ...filterProps }) => {
        const toOption = optionName => (optionName ? { label: snakeToTitleCase(optionName.toString()), value: optionName } : null)

        const handleChange = (option, { action }) => {
            switch (action) {
                case "select-option":
                    updateFilters({ [name]: option?.value })
                    break;
                default:
                    updateFilters({ [name]: initialFilters[name] })
                    break;
            }
        }

        return (
            <Select
                isMulti={false}
                menuShouldScrollIntoView={false}
                isClearable
                isSearchable={false}
                placeholder={`${snakeToTitleCase(name)}...`}
                options={searchOptions[name]?.map(toOption)}
                onChange={handleChange}
                value={toOption(filters[name])}
                defaultValue={toOption(initialFilters[name])}
                {...filterProps}
            />
        );
    }

    TemplateFilter.propTypes = {
        name: PropTypes.string.isRequired
    };

    return (
        <Form className="d-flex" action="/animes" onSubmit={handleSubmit} {...otherProps}>

            <Row>
                <InputGroup>
                    <Form.Control
                        name="anime_name"
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        value={filters.anime_name ?? ""}
                        onChange={({ target }) => updateFilters({ anime_name: target.value })}
                        aria-label="Search" />

                    <Button aria-label="Show filters" variant="outline-primary"
                        className="d-sm-none d-flex align-items-center" onClick={handleShowModal}>
                        <ListTask size={20} />
                    </Button>

                    <ToggleButton aria-label="Toggle search as you type" variant="outline-secondary"
                        className="d-flex align-items-center d-none d-sm-flex" type="checkbox"
                        checked={autoSearch} onClick={toggleAutoSearch}>
                        <ArrowRepeat size={20} />
                    </ToggleButton>

                    <Button aria-label="Search" variant="outline-success"
                        className="d-flex align-items-center" type="submit">
                        <Search size={20} />
                    </Button>
                </InputGroup>
            </Row>

            <Row className="g-1 mt-1 d-none d-sm-flex">
                <Col>
                    <TemplateFilter name="list_type" />
                </Col>
                <Col>
                    <TemplateFilter name="_order_by" />
                </Col>
                <Col xs="auto">
                    <TemplateFilter
                        name="_limit"
                        getOptionLabel={({ label }) => `${label} per page`}
                        isClearable={false} />
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Search options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="vstack gap-2">
                        <TemplateFilter name="list_type" />
                        <TemplateFilter name="_order_by" />
                        <TemplateFilter
                            name="_limit"
                            getOptionLabel={({ label }) => `${label} per page`}
                            isClearable={false} />
                        <Form.Check label="Toggle search as you type" type="switch" checked={autoSearch} onChange={toggleAutoSearch} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Search
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}

const snakeToTitleCase = (s) => s.replace(/^_*(.)|_+(.)/g, (_s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())

AnimeSearch.propTypes = {
    initialFilters: PropTypes.object,
    isAutoSearch: PropTypes.bool,
    onSearch: PropTypes.func
};