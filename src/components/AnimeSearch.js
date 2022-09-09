
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useForm } from '../utils/hooks';

export default function AnimeSearch({ onSearch, ...props }) {
    const navigate = useNavigate();
    const [searchFilters, setSearchFilters] = useForm({
        _order_by: "best_match",
        list_type: "filter",
        anime_name: new URLSearchParams(window.location.search).get("anime_name")
    });

    const handleSubmit = e => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchFilters)
        } else {
            navigate({
                pathname: "animes",
                search: createSearchParams(searchFilters).toString()
            });
        }
    };

    return (
        <Form className="d-flex" action="/animes" onSubmit={handleSubmit} {...props}>
            <InputGroup>
                <Form.Control
                    name="anime_name"
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchFilters.anime_name}
                    onChange={setSearchFilters}
                    aria-label="Search" />
                <Button variant="outline-success" className="d-flex align-items-center" type="submit"><Search size={20} /></Button>
            </InputGroup>
        </Form>
    );
}
