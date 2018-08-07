require.config({
    //baseUrl:earthGis.ServerPath+"../",
    baseUrl: "http://localhost:8070/src/assets/js",
    /*     baseUrl: "http://47.98.241.102:8085/skyApi/", */
    config: {
        es6: {
            resolveModuleSource: function(source) {
                return 'es6!' + source;
            }
        }
    },
    map: {
        '*': {
            'css': './vendor/require/css.min'
        }
    },
    packages: [{
        name: 'less',
        location: './vendor/require/',
        main: 'less'
    }],
    paths: {
        'jquery': './vendor/jquery-1.9.1.min',
        'vue': './vue/vue',
        'vuex': './vue/vuex',
        'vuerouter': './vue/vue-router',
        'es6': './vendor/babel/es6',
        'babel': './vendor/babel/babel-5.8.34.min',
        'config': './config',
        'index': './index'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        }
    }
});
require(['es6!./index']);