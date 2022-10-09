import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';


/**
 * Converts a snake_case string to Title Case.
 *
 * @param {string} string The string to convert.
 * @return {string} The converted string.
 */
export function snakeToTitleCase(string) {
    return string.replace(/^_*(.)|_+(.)/g, (_s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase());
}


/* This is a higher order component that 
*  inject a special prop to our component.
*/
export function withParams(Component) {
    /**
     * ComponentWithParams
     * @param {object} props
     * @returns {React.Component}
     */
    function ComponentWithParams(props) {
        let params = useParams()

        return <Component {...props} params={params} />
    }
    return ComponentWithParams
}


/* This is a higher order component that 
*  inject a special prop to our component.
*/
export function withSearchParams(Component) {
    /**
     * ComponentWithSearchParams
     * @param {Object} props
     * @returns {React.Component}
     */
    function ComponentWithSearchParams(props) {
        let [searchParams, setSearchParams] = useSearchParams()

        return <Component {...props} searchParams={searchParams} setSearchParams={setSearchParams} />
    }
    return ComponentWithSearchParams
}
