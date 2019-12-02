class Router {

    constructor() {
        this.getRoutes = [];
        this.postRoutes = [];
        this.putRoutes = [];
        this.updateRoutes = [];
        this.deleteRoutes = [];
    }

    get(route, callback) {
        this.addtolist(this.getRoutes, route, callback);
    }

    post(route, callback) {
        this.addtolist(this.postRoutes, route, callback);
    }

    put(route, callback) {
        this.addtolist(this.putRoutes, route, callback);
    }

    update(route, callback) {
        this.addtolist(this.updateRoutes, route, callback);
    }

    delete(route, callback) {
        this.addtolist(this.deleteRoutes, route, callback);
    }

    addtolist(reference, route, callback) {
        reference.push({
            "route": route,
            "callback": callback
        });
    }

    prefix(ref,pref){
        ref.forEach(element => {
            element.route = pref + element.route;
        });
    }

    use(pref, routes) {
        this.prefix(routes.getRoutes,pref);
        this.prefix(routes.postRoutes,pref);
        this.prefix(routes.putRoutes,pref);
        this.prefix(routes.deleteRoutes,pref);
        this.prefix(routes.updateRoutes,pref);

        this.getRoutes.push(...routes.getRoutes);
        this.postRoutes.push(...routes.postRoutes);
        this.putRoutes.push(...routes.putRoutes);
        this.deleteRoutes.push(...routes.deleteRoutes);
        this.updateRoutes.push(...routes.updateRoutes);
    }

    render(reference, req, res) {
        let url = req.url.split('\n')[0].split("?")[0];
        reference.forEach(element => {
            if (url == element.route) {
                element.callback(req, res);
                return;
            }
        });
    }

    handler(req, res) {
        switch (req.method) {
            case 'POST':
                this.render(this.postRoutes, req, res);
                break;
            case 'PUT':
                this.render(this.putRoutes, req, res);
                break;

            case 'GET':
                this.render(this.getRoutes, req, res);
                break;

            case 'UPDATE':
                this.render(this.updateRoutes, req, res);
                break;

            case 'DELETE':
                this.render(this.deleteRoutes, req, res);
                break;

            default:
                res.writeHead(404);
                res.end();
        }
    }
}

module.exports = Router;