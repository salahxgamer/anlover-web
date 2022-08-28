import React from 'react';
import { useParams } from 'react-router-dom';

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
