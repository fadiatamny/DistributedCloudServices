
class Router {

    constructor() {
        this.getRoutes = [];
        this.postRoutes = [];
        this.putRoutes = [];
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

    delete(route, callback) {
        this.addtolist(this.deleteRoutes, route, callback);
    }

    addtolist(reference, route, callback) {
        reference.push({
            "route": route,
            "callback": callback
        });
    }

    prefix(ref, pref) {
        ref.forEach(element => {
            element.route = pref + element.route;
        });
    }

    use(pref, routes) {
        this.prefix(routes.getRoutes, pref);
        this.prefix(routes.postRoutes, pref);
        this.prefix(routes.putRoutes, pref);
        this.prefix(routes.deleteRoutes, pref);

        this.getRoutes.push(...routes.getRoutes);
        this.postRoutes.push(...routes.postRoutes);
        this.putRoutes.push(...routes.putRoutes);
        this.deleteRoutes.push(...routes.deleteRoutes);
    }

    render(reference, req, res) {
        let url = req.url.split("?")[0];
        reference.forEach(element => {
            if (url.toLowerCase().includes(element.route.toLowerCase())) {
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