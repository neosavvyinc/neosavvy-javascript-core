/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg:grunt.file.readJSON('package.json'),
        banner:'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat:{
            options:{
                banner:'<%= banner %>',
                stripBanners:true
            },
            dist:{
                src:'src/main/resources/library/**/*.js',
                dest:'dist/<%= pkg.name %>.js'
            }
        },
        uglify:{
            options:{
                banner:'<%= banner %>'
            },
            dist:{
                src:'<%= concat.dist.dest %>',
                dest:'dist/<%= pkg.name %>.min.js'
            }
        },
        karma:{
            unit:{
                configFile:'karma.conf.js'
            },
            build: {
                configFile:'karma.conf.js',
                singleRun: true,
                browsers: ['Chrome']
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'src/main/resources/library/',
                    outdir: 'docs/'
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: './web-server.js',
                    args: ['4900'],
                    cwd: __dirname
                }
            }
        },
        open : {
            docs : {
                path: 'http://127.0.0.1:4900/docs',
                app: 'Google Chrome'
            },
            coverage : {
                path: 'http://127.0.0.1:4900/coverage',
                app: 'Google Chrome'
            }
        },
        concurrent: {
            dev: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['nodemon', 'open']
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task.
    grunt.registerTask('default', ['karma:build', 'yuidoc', 'concat', 'uglify', 'concurrent']);

    // Generate docs

};
