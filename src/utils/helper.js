import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

/* This is a higher order component that 
*  inject a special prop to our component.
*/
export function withParams(Component) {
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
    function ComponentWithSearchParams(props) {
        let [searchParams, setSearchParams] = useSearchParams()

        return <Component {...props} searchParams={searchParams} setSearchParams={setSearchParams} />
    }
    return ComponentWithSearchParams
}
