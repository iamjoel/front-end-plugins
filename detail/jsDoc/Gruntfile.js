module.exports = function(grunt) {
    grunt.initConfig({
        jsdoc: {
            src: ['./demo.js'],
            options: {
                destination: './doc'
            }
        }
    });


    // Load grunt tasks from NPM packages
    require("load-grunt-tasks")(grunt);

    grunt.registerTask('doc', ['jsdoc']);

    grunt.registerTask('default', ['doc']);
};
