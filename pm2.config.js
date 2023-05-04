module.exports = {
    apps: [{
        name: 'api.unenscore.mn',
        script: './dist/main.js',
        instances: 'max',
        exec_mode: 'cluster'
    }]
};
