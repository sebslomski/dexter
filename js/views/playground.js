define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXResponsiveView'
], function(
    debug,
    _, $,
    dXResponsiveView
) {

    /**
     * The container including the player view. Listens to mouse movements and
     * emits the playerMove event.
     *
     * @class PlaygroundView
     * @author Tamas-Imre Lukacs
     */

    return dXResponsiveView.extend(/** @lends PlaygroundView.prototype */{
        dXName: 'playground',

        /**
         * Get the required player view.
         */

        dXSubViews: ['player'],

        /**
         * Listen to mouse movements and emit the playerMove event.
         */

        initialize: function() {
            dXResponsiveView.prototype.initialize.call(this);

            var that = this,
                min, max, x,
                playerWidth = this.$el.find('.player').width();

            /**
             * The mouse of the user moves the player.
             *
             * @event playerMove
             */

            $('body').mousemove(function(e) {
                min = playerWidth/2;
                max = that.$el.width()-min;

                x = e.pageX > max? max :
                    e.pageX < min? min : e.pageX;

                that.dXPipe.emit('playerMove', x);
            });
        }

    });

});