import Events from "./events.js";

const ROUTER_TYPES = {
    hash: "hash", history: "history"
}, defer = x => { setTimeout(() => x(), 10); }

class Router {
    constructor(options = {}) {
        this.events = new Events(this);
        this.options = { type: ROUTER_TYPES.hash, ...options };
    }

    listen() {
        this.routeHash = Object.keys(this.options.routes);
        if (!this.routeHash.includes("/"))
            throw TypeError("No home route found");

        if (this.isHashRouter) {
            window.addEventListener('hashchange', this._hashChanged.bind(this));
            defer(() => this._tryNav(document.location.hash.substr(1)));
        }
        else {
            let href = document.location.origin;
            if (this._findRoute(document.location.pathname)) {
                href += document.location.pathname;
            }
            document.addEventListener("click", this._onNavClick.bind(this));
            window.addEventListener("popstate", this._triggerPopState.bind(this));
            defer(() => this._tryNav(document.location.href));
        }
        return this;

    }

    _hashChanged() {
        this._tryNav(document.location.hash.substr(1))
    }

    _triggerPopState(e) {
        this._triggerRouteChange(e.state.path, e.target.location.href);
    }

    _triggerRouteChange(path, url) {
        this.events.trigger("route", {
            route: this.options.routes[path], path: path, url: url
        })
    }

    _findRoute(url) {

        return url;
        //return this.routeHash.includes(url) ? url : null;
    }

    _tryNav(href) {
        const url = this._createUrl(href);
        if (url.protocol.startsWith("http")) {
            const routePath = this._findRoute(url.pathname);
            if (routePath && this.options.routes[routePath]) {
                if (this.options.type === "history") {

                    window.history.pushState({ path: routePath }, routePath, url.href);
                }
                this._triggerRouteChange(routePath, url);
                return true;
            }
        }
    }

    __routing(options) {
        let urlGenerate = options.path + ( (options.param) ? `?${options.param}`:'')
        const url = this._createUrl(urlGenerate);
        this._tryNav(url.href)
    }

    _createUrl(href) {
        if (this.isHashRouter && href.startsWith("#")) {
            href = href.substr(1);
        }
        return new URL(href, document.location.origin)
    }

    _onNavClick(e) {

        if (e.target.classList.contains('nav-link-text') || e.target.classList.contains('nav-icon') || e.target.classList.contains('nav-link')) {
            const href = e.target?.closest("[href]")?.href;
            if (href && this._tryNav(href));
            e.preventDefault();
        }

        if (e.target.classList.contains('submenu-link-clicked')) {
            const href = e.target?.closest("[href]")?.href;
            if (href && this._tryNav(href));
            e.preventDefault();
        }
    };

    setRoute(path) {
        if (!this._findRoute(path))
            throw TypeError("Invalid route");
        let href = this.isHashRouter ? '#' + path : document.location.origin + path;
        history.replaceState(null, null, href);
        this._tryNav(href);
    }

    validateURL(){
        const urlValidate = document.location;
        return (urlValidate.pathname.includes('/entidad/')) ? 1 : 0;
    }

    getParam( params = [] ){
        const urlParams = new URLSearchParams(window.location.search);
        let ParamsOBJ = {}
        params.map((param)=>{
            ParamsOBJ[param] = urlParams.get(param)
        })

        return ParamsOBJ;
    }

    get isHashRouter() {
        return this.options.type === ROUTER_TYPES.hash;
    }
}

export default Router;
