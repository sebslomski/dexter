// Karma configuration
// Generated on Sat Jan 18 2014 20:53:08 GMT+0100 (CET)

module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['mocha', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            'js/tests/test-main.js',

            // Basic
            {pattern: 'js/**/*.js', included: false},
            {pattern: 'configs/*.js', included: false},
            {pattern: 'templates/**/*.html', included: false},

            // Bower components
            {pattern: 'bower_components/jquery/jquery.js', included: false},
            {pattern: 'bower_components/underscore/underscore-min.js', included: false},
            {pattern: 'bower_components/backbone/backbone-min.js', included: false},
            {pattern: 'bower_components/modernizr/modernizr.js', included: false},
            {pattern: 'bower_components/mustache/mustache.js', included: false},
            {pattern: 'bower_components/SimpleStateManager/src/ssm.js', included: false},
            {pattern: 'bower_components/eventemitter2/lib/eventemitter2.js', included: false},

            // NPM modules
            {pattern: 'node_modules/chai/chai.js', included: false}
        ],

//    preprocessors: {
//      'js/collections/**/*.js': 'coverage',
//      'js/libs/**/*.js': 'coverage',
//      'js/models/**/*.js': 'coverage',
//      'js/plugins/**/*.js': 'coverage'
//    },


        // list of files to exclude
        exclude: [
            'js/main.js'
        ],


//    coverageReporeter: {
//      type: 'html',
//      dir: 'coverage/'
//    },


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'/*, coverage*/],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
