
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

export default function AnimeSearch(props) {

    return (
        <Form className="d-flex" action="/animes" {...props}>
            <input type="hidden" name="_order_by" value="best_match" />
            <input type="hidden" name="list_type" value="filter" />
            <InputGroup>
                <Form.Control
                    name="anime_name"
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search" />
                <Button variant="outline-success" className="d-flex align-items-center" type="submit"><Search size={20} /></Button>
            </InputGroup>
        </Form>
    );
}
