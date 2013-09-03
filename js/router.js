/**
 * The router manages the loading of global and routed
 * views and the behaviour on route change. We use the
 * Backbone.Router to simplify the routing.
 *
 * @class Router
 * @author: Tamas-Imre Lukacs
 */

define([
    'libs/debug',
    'underscore',
    'jquery',
    'backbone',
    'modernizr',
    'configs/routes.conf',
    'configs/dexter.conf',
    'viewLoader!',
    'templateLoader!',
    'libs/applyMaybe',
    'libs/intersect',
    'libs/debugBar',
    'libs/getUrlVars',
    'shim!Object.keys'
], function(
    debug,
    _, $,
    Backbone,
    Modernizr,
    routesConf,
    dexterConf,
    viewList,
    templateList,
    applyMaybe,
    intersect,
    debugBar
    ) {

    debug = debug('DX');

    var AppRouter = Backbone.Router.extend({
        routes: routesConf
    });

    return /** @lends Router.prototype */{

        /**
         * Stores the Backbone.Router object.
         * TODO extend Backbone.Router directly?
         */

        obj: null,

        /**
         * Stores the current, route-linked view.
         */

        currentView: {},

        /**
         * Stores the routed views, if loaded.
         */

        viewCache: {},

        /**
         * An object with every view prototype.
         */

        viewList: null,

        /**
         * The current routing parameters.
         */

        parameters: null,

        /**
         * The main behaviour of the router is described here.
         * Load the global views first, register the routed views
         * afterwards and manage the behaviour on route change.
         */

        init: function() {
            var i, view, viewName, self;

            self = this;
            self.obj = new AppRouter;
            self.viewList = viewList;

            /*
             * Load global, navigation independent views.
             */

            for (i=dexterConf.global.length; i--;) {
                viewName = dexterConf.global[i];

                if (viewName in self.viewList) {
                    view = new (self.viewList[viewName].extend({
                        router: self
                    }))();

                    self.viewCache[viewName] = view;
                }
            }

            /*
             * Match the route to his corresponding view and
             * render it dynamically.
             */

            for (viewName in self.viewList) {
                if (self.viewList.hasOwnProperty(viewName)) {
                    (function(viewName) {

                        /*
                         * Manage route changes.
                         */

                        self.obj.on('route:'+viewName, function() {

                            /*
                             * Store the route parameters in <router.parameters> for the
                             * views. The <isRouting> flag will be used to clear and leave
                             * the currentView after initializing the new view with his
                             * template in <dXUpdate>.
                             */

                            self.isRouting = true;
                            self.parameters = Array.prototype.slice.call(arguments);
                            self.path = Backbone.history.fragment;

                            debug.lightblue('navigate to /'+self.path);

                            /*
                             * Leave current view.
                             */

                            if ('dXLeave' in self.currentView) {
                                self.currentView.dXLeave();
                            }

                            /*
                             * Get or create the desired view instance and render
                             * it with his subviews with <dXEnter>. If the view is
                             * not yet cached, the initialization will call <dXEnter>.
                             */

                            if (!(viewName in self.viewCache)) {
                                view = new (self.viewList[viewName].extend({
                                    router: self
                                }))();
                                self.viewCache[viewName] = view;

                            } else {
                                view = self.viewCache[viewName];
                                if ('dXEnter' in view) {
                                    view.dXEnter();
                                }
                            }

                            // Reference current router-enabled view
                            self.currentView = view;
                        });

                    })(viewName);
                }
            }

            /*
             * Start backbone navigation.
             */

            if (Modernizr.history) {
                Backbone.history.start({ pushState: true });
            } else {
                Backbone.history.start();
            }

            /*
             * Prevent page reload on link click.
             */

            $(document).on('click', 'a[href^="/"]', function(event) {
                var href, url;

                href = $(event.currentTarget).attr('href');
                if (!event.altKey && !event.ctrlKey &&
                    !event.metaKey && !event.shiftKey) {

                    event.preventDefault();
                    url = href.replace(/^\//,'').replace(/#!/, '');
                    self.obj.navigate(url, { trigger: true });
                }
            });

            /*
             * Debugging tool
             */

            if ($.getUrlVar('debug')) {
                debugBar(self.viewCache);
            }
        }
    };

});