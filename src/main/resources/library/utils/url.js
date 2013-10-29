var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * Thanks to philidem on github for this great starting point.
 * https://github.com/philidem/url-util-js/blob/master/test/url-util-spec.js
 *
 * @class Neosavvy.Core.Utils.UrlUtils
 * @static
 **/
Neosavvy.Core.Utils.UrlUtils = (function () {

        function URL(url, queryString) {
            if (url) {
                this._parse(url);
            } else {
                throw Error("Can not create a url with undefined URL param");
            }

            if (queryString) {
                this.getQueryString().parse(queryString);
            }
        }

        var protocolChars = 'abcdefghijklmnopqrstuvwxyz0123456789+-.';
        var validProtocolChars = {};

        for ( var i = 0; i < protocolChars.length; i++) {
            validProtocolChars[protocolChars.charAt(i)] = true;
        }

        URL.parse = function(url, queryString) {
            return new URL(url, queryString);
        };

        URL.isValidProtocol = function(protocol) {
            for (var i = 0; i < protocol.length; i++) {
                /*
                 * If we find an illegal character in the protocol then this is not
                 * the protocol...
                 */
                if (!validProtocolChars[protocol.charAt(i)]) {
                    return false;
                }
            }

            return true;
        };

        URL.prototype = {
            _parse : function(url) {

                var pos;

                /*
                 * parse the fragment (part after hash symbol) first according to
                 * RFC
                 */
                pos = url.indexOf('#');
                if (pos !== -1) {
                    if ((pos + 1) < url.length) {
                        this.hash = url.substring(pos + 1);
                    }

                    /* continue parsing everything before the hash symbol */
                    url = url.substring(0, pos);
                }

                /* parse the protocol according to RFC */
                pos = url.indexOf(':');
                if (pos !== -1) {
                    /*
                     * We found what might be the protocol but let's make sure it
                     * doesn't contain any invalid characters..
                     */
                    var possibleProtocol = url.substring(0, pos).toLowerCase();

                    if (URL.isValidProtocol(possibleProtocol)) {
                        this.protocol = possibleProtocol;
                        pos++;

                        if (pos === url.length) {
                            /*
                             * reached the end of the string (input was something
                             * like "http:"
                             */
                            return;
                        }

                        /* continue parsing everything past the protocol */
                        url = url.substring(pos);
                    }
                }

                if ((url.charAt(0) === '/') && (url.charAt(1) === '/')) {

                    // URL will contain network location (i.e. <host>:<port>)

                    /* find where the path part starts */
                    pos = url.indexOf('/', 2);
                    if (pos === -1) {
                        /*
                         * There is no path and there can't be a query according to
                         * the RFC
                         */
                        if (url.length > 2) {
                            this._parseNetworkLocation(url.substring(2));
                        }
                        return;
                    } else {
                        /*
                         * there is a path so parse network location before the path
                         */
                        this._parseNetworkLocation(url.substring(2, pos));
                        url = url.substring(pos);
                    }
                }

                var protocol = this.protocol;
                if (!protocol || (protocol === 'http') || (protocol === 'https')) {
                    /*
                     * Now parse the path and query string.. If there is no '?'
                     * character then the remaining portion is just the path.
                     */
                    pos = url.indexOf('?');
                    if (pos === -1) {
                        this.path = url;
                    } else {
                        this.path = url.substring(0, pos);
                        if ((pos + 1) < url.length) {
                            this.queryString = new QueryString(url.substring(pos + 1));
                        }
                    }
                } else {
                    this.path = url;
                }
            },

            /**
             * Parse the network location which will contain the host and possibly
             * the port.
             *
             * @param networkLocation
             *            the network location portion of URL being parsed
             */
            _parseNetworkLocation : function(networkLocation) {
                var pos = networkLocation.indexOf(':');
                if (pos === -1) {
                    this.host = networkLocation;
                } else {
                    this.host = networkLocation.substring(0, pos);
                    if (pos < (networkLocation.length - 1)) {
                        this.port = networkLocation.substring(pos + 1);
                    }
                }
            },

            setHost : function(host) {
                this.host = host;
            },

            getHost : function() {
                return this.host;
            },

            setPath : function(path) {
                this.path = path;
            },

            getPath : function() {
                return this.path;
            },

            getQueryString : function() {
                if (!this.queryString) {
                    this.queryString = new QueryString();
                }

                return this.queryString;
            },

            setQueryString : function(queryString) {
                this.queryString = queryString;
            },

            /**
             * converts the URL to its string representation
             *
             * @return {String} string representation of URL
             */
            toString : function() {
                var queryString = (this.queryString)
                    ? this.queryString.toString() : null;

                var parts = [];

                if (this.protocol) {
                    parts.push(this.protocol);
                    parts.push('://');
                }

                if (this.host !== undefined) {
                    parts.push(this.host);
                }

                if (this.port !== undefined) {
                    parts.push(':');
                    parts.push(this.port);
                }

                parts.push(this.path);

                if (queryString) {
                    parts.push('?');
                    parts.push(queryString);
                }

                if (this.hash) {
                    parts.push('#');
                    parts.push(this.hash);
                }

                return parts.join('');
            },

            /**
             * removes a parameter from the query string
             *
             * @param {String}
             *            name parameter name
             */
            removeParameter : function(name) {
                this.getQueryString().removeParameter(name);
            },

            /**
             * sets the value of a query string parameter
             *
             * @param {String}
             *            name parameter name
             * @param {Strign}
             *            value parameter value
             */
            setParameter : function(name, value) {
                this.getQueryString().setParameter(name, value);
            },

            /**
             * retrieves a value of parameter from the query string
             *
             * @param {String}
             *            name parameter name
             */
            getParameter : function(name) {
                return this.getQueryString().getParameter(name);
            },

            getPathWithQueryString : function() {
                return (this.queryString)
                    ? this.path + '?' + this.queryString
                    : this.path;
            },

            getPort : function() {
                if (this.port !== undefined) {
                    return this.port;
                }

                if (this.protocol === 'http') {
                    return 80;
                }

                if (this.protocol === 'https') {
                    return 443;
                }

                return undefined;
            }
        };

        function QueryString(queryString) {
            this._params = {};

            if (queryString) {
                this.parse(queryString);
            }
        }

        QueryString.parse = function(queryString) {
            if (!queryString) {
                return new QueryString();
            }

            if (queryString.constructor === QueryString) {
                return queryString;
            } else {
                return new QueryString(queryString.toString());
            }
        };

        QueryString.prototype = {

            getParameters: function() {
                return this._params;
            },

            parse : function(queryString) {

                if (typeof queryString === 'object') {
                    for (var key in queryString) {
                        if (queryString.hasOwnProperty(key)) {
                            this.add(key, queryString[key]);
                        }
                    }
                } else {
                    var parameters = queryString.split('&');

                    for (var i = 0; i < parameters.length; i++) {
                        var param = parameters[i];
                        pos = param.indexOf('=');

                        var name, value;

                        if (pos == -1) {
                            name = param;
                            value = null;
                        } else {
                            name = param.substring(0, pos);
                            value = decodeURIComponent(param.substring(pos + 1));
                        }

                        if (name == '') {
                            continue;
                        }

                        this.add(name, value);
                    }
                }
            },

            /**
             * removes a parameter from the query string
             *
             * @param {String} name parameter name
             */
            remove : function(name) {
                delete this._params[name];
            },

            /**
             * sets the value of a query string parameter
             *
             * @param {String} name parameter name
             * @param {Strign} value parameter value
             */
            set : function(name, value) {
                if (value === null) {
                    this.remove(name);
                } else {
                    this._params[name] = value;
                }
            },

            /**
             * sets the value of a query string parameter
             *
             * @param {String} name parameter name
             * @param {Strign} value parameter value
             */
            add : function(name, value) {
                var existingValue = this._params[name];

                if (existingValue !== undefined) {
                    if (existingValue.constructor === Array) {
                        if (value.constructor === Array) {
                            for ( var i = 0; i < value.length; i++) {
                                existingValue.push(value[i]);
                            }
                        } else {
                            existingValue.push(value);
                        }
                        value = existingValue;
                    } else {
                        value = [ existingValue, value ];
                    }
                }

                this._params[name] = value;
            },

            /**
             * retrieves a value of parameter from the query string
             *
             * @param {String} name parameter name
             */
            get : function(name) {
                var value = this._params[name];
                if (value === undefined) {
                    return null;
                }

                return value;
            },


            /**
             * converts the URL to its string representation
             *
             * @return {String} string representation of URL
             */
            toString : function() {
                var parts = [];

                for ( var name in this._params) {
                    if (this._params.hasOwnProperty(name)) {
                        var value = this._params[name];

                        if ((value === undefined) || (value === null)) {
                            parts.push(name);
                        } else if (value.constructor === Array) {

                            for ( var i = 0; i < value.length; i++) {
                                parts.push(name + '=' + encodeURIComponent(value[i]));
                            }
                        } else {
                            parts.push(name + '=' + encodeURIComponent(value));
                        }
                    }
                }

                return parts.join('&');
            }
        };

        return {
            URL : URL,
            QueryString : QueryString,
            parse : function(url, queryString) {
                return this.URL.parse.apply(this, arguments);
            }
        }
})();
