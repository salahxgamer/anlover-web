import React from 'react';


/**
 * useSearchParam
 *
 * @param {string} param - The name of the search parameter to use
 * @returns {string} - The value of the search parameter
 *
 * @example
 * const searchParam = useSearchParam('foo');
 *
 * @example
 * const searchParam = useSearchParam('foo', 'bar');
 * // searchParam will be 'bar' if the search parameter 'foo' is not present
 * //If the URL is `http://example.com/?foo=bar`
 * searchParam === 'bar'
 */
export const useSearchParam = param => {
    // Create a function that gets the value of the search parameter
    const getValue = React.useCallback(
        () => new URLSearchParams(window.location.search).get(param),
        [param]
    );

    // Create a state variable to store the value of the search parameter

    const [value, setValue] = React.useState(getValue);

    React.useEffect(() => {
        // Update the state variable when the URL changes
        const onChange = () => {
            setValue(getValue());
        };

        // Listen for URL changes
        window.addEventListener('popstate', onChange);
        window.addEventListener('pushstate', onChange);
        window.addEventListener('replacestate', onChange);

        // Remove the event listeners when the component unmounts
        return () => {
            window.removeEventListener('popstate', onChange);
            window.removeEventListener('pushstate', onChange);
            window.removeEventListener('replacestate', onChange);
        };
    });

    // Return the value of the search parameter
    return value;
};

/**
 * useForm
 *
 * @param {object} initialValues - The initial values of the form
 * @returns {array<string, function>} - An array containing the values of the form and a function to update the values
 *
 * @example
 * const [values, updateValues] = useForm({
 *     foo: 'bar',
 *     baz: 'qux'
 * });
 *
 * // values will be { foo: 'bar', baz: 'qux' }
 *
 * updateValues({
 *     target: {
 *         name: 'foo',
 *         value: 'quux'
 *     }
 * });
 *
 * // values will be { foo: 'quux', baz: 'qux' }
 */
export const useForm = initialValues => {
    const [values, setValues] = React.useState(initialValues);

    return [
        values,
        e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }
    ];
};