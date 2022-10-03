import API from '../utils/api';

/**
 * Provider class
 * 
 * @class Provider
 */
export default class Provider {

    /**
     * Verbose log
     * @static
     * @memberof Provider
     */
    static VERBOSE_LOG = false;

    /**
     * Urls of the provider
     * 
     * @type {Array}
     * @memberof Provider
     */
    urls = [];

    /**
     * Labels of the provider
     * 
     * @type {Array}
     * @memberof Provider
     */
    labels = [];

    /**
     * Is the provider resolved
     * 
     * @type {Boolean}
     * @memberof Provider
     */
    isResolved = false;

    /**
     * Error of the provider
     * 
     * @type {Error}
     * @memberof Provider
     */
    error = null;

    /**
     * Request of the provider
     * 
     * @type {Promise}
     * @memberof Provider
     */
    request = null;


    /**
     * Creates an instance of Provider.
     * @param {Object} serializedProvider 
     * @memberof Provider
     */
    constructor(serializedProvider) {
        this.url = new URL(serializedProvider.url);
    }

    /**
     * Resolve the provider
     * 
     * @returns {Promise}
     * @memberof Provider
     */
    resolve = () => {
        if (!this.isResolved)
            this.request = API.fetchProvider(this.url.toString(), { signal: this._signal })
                .then(this._successHandler)
                .catch(this._errorHandler)
                .finally(() => {
                    this.isResolved = true;
                });
        return this.request
    }

    /**
     * Froce resolve and reset the provider
     * 
     * @returns {Promise}
     * @memberof Provider
     */
    forceResolve = () => {
        // Reset the provider
        this.urls = [];
        this.labels = [];
        this.isResolved = false;
        this.error = null;
        // Resolve the provider
        return this.resolve;
    }

    /**
     * Error handler
     * 
     * @param {Error} err 
     * @memberof Provider
     */
    _errorHandler = (err) => {
        this.VERBOSE_LOG && console.warn("[Provider] Provider rejected :", this, err);
        this.error = err;
        // throw err;
    }

    /**
     * Success handler
     * 
     * @param {Object} data 
     * @memberof Provider
     */
    _successHandler = async (data) => {
        this.urls = data.urls ?? [];
        this.labels = data.labels ?? [];
        this.VERBOSE_LOG && console.log("[Provider] Provider resolved :", this, data);
        return this;
    }

    /**
     * Cancel the provider
     * 
     * @param {String} reason 
     * @memberof Provider
     */
    cancel = (reason) => {

        this.VERBOSE_LOG && console.log("[Provider] Provider cancelled :", this);
        this._controller?.abort(reason);
    }

    /**
     * Callback when the provider is loaded
     * 
     * @param {Function} callback 
     * @memberof Provider
     */
    onSuccessfulResolve = (callback) => {
        this.request?.then((provider) => {
            if (this.isSuccessful) {
                callback(this);
                this.VERBOSE_LOG && console.log("[Provider] Calling the onSuccessfulResolve callback function");
            }
            return provider;
        })
    }

    /**
     * Is the provider successful
     * Returns true if the provider is resolved and no error were encountered and has urls
     * 
     * @readonly
     * @memberof Provider
     */
    get isSuccessful() {
        return !!(this.isResolved && !this.error && this.urls.length > 0)
    }

    /**
     * Name of the provider
     * 
     * @readonly
     * @memberof Provider
     */
    get name() {
        return this._name || this.url.hostname
    }


    /**
     * Stringify the provider
     * 
     * @returns {String}
     * @memberof Provider
     */
    toString = () => {
        return this.url.toString();
    }

    /**
     * Convert to a static object
     * 
     * @returns {Object}
     * @memberof Provider
     */
    toObject = () => {
        return { ...this }
    }
}