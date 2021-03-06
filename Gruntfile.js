/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg:grunt.file.readJSON('package.json'),

        shell: {
            buildVersion : {
                options: {
                    callback: function( err, stdout, stderr, cb ) {
                        console.log(stdout);
                        cb();

                    }
                },
                command: [
                    'rm src/main/resources/buildinfo.txt',
                    'touch src/main/resources/buildinfo.txt',
                    'echo `date` >> src/main/resources/buildinfo.txt',
                    "echo 'Built from branch: ' `git rev-parse --abbrev-ref HEAD` >> src/main/resources/buildinfo.txt",
                    "cat src/main/resources/buildinfo.txt"
                ].join("&&")
            },
            renameCoverage: {
                options: {
                    callback: function( err, stdout, stderr, cb) {
                        console.log("Renaming Coverage Reports...");
                        cb();
                    }
                },
                command: [
                    "cd target/coverage",
                    "ls | sed -n 's/^Chrome.*/mv \"&\" Chrome/gp'  | sh"
                ].join("&&")

            }
        },

        banner:'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        clean: {
            clean: ['<%= pkg.paths.buildOutputDirectory %>'],
            bower: ['<%= pkg.paths.sourceDirectory %>/lib/']
        },

        bower:{
            install:{
                options:{
                    targetDir:'<%= pkg.paths.libraries %>',
                        cleanup:true
                }
            }
        },

        copy: {
            browser: {
                files: [
                    {
                        expand:true,
                        cwd:'<%= pkg.paths.sourceDirectory %>',
                        src:[
                            '**/*'
                        ],
                        dest: '<%= pkg.paths.buildOutputDirectory %>/browser/en'
                    }
                ]
            }
        },

        concat:{
            options:{
                banner:'<%= banner %>',
                stripBanners:true
            },
            dist:{
                src: ['src/main/resources/library/index.js', 'src/main/resources/library/**/*.js'],
                dest:'<%= pkg.paths.buildOutputDirectory %>/<%= pkg.name %>.js'
            }
        },


        uglify:{
            options:{
                banner:'<%= banner %>'
            },
            dist:{
                src:'<%= concat.dist.dest %>',
                dest:'<%= pkg.paths.buildOutputDirectory %>/<%= pkg.name %>.min.js'
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
            },
            ci: {
                configFile:'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
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
                    outdir: '<%= pkg.paths.buildOutputDirectory %>/docs/'
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: './web-server.js',
                    args: [
                        '4900',
                        __dirname + "/target/"
                    ],
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
                path: 'http://127.0.0.1:4900/coverage/Chrome',
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    /**
     * We have some external dependencies in our build. This should ensure
     * both are on your machine before letting the build complete.
     *
     * 1) Ruby is needed for SASS
     * 2) SASS is needed to compile CSS from SCSS
     */
    grunt.registerTask('verify', []);

    /**
     * Phase 2 is to resolve dependencies
     * - Right now we use Bower to do so.
     */
    grunt.registerTask('resolve', ['bower:install']);

    /**
     * Phase 3 is to copy resources from source directories to the target
     * -
     */
    grunt.registerTask('copyResources', ['shell:buildVersion', 'concat', 'uglify']);

    /**
     * Phase 4 is to run tests against the pre-copied source and post-copied source
     */
    grunt.registerTask('runTestsCi', ['karma:ci', 'yuidoc', 'shell:renameCoverage']);
    grunt.registerTask('runTestsBuild', ['karma:build', 'yuidoc', 'shell:renameCoverage']);

    /**
     * Phase 5 is to deploy and start the application
     */
    grunt.registerTask('deploy', ['concurrent']);

    // Default task.
    grunt.registerTask('default', ['verify', 'clean', 'resolve', 'copyResources', 'runTestsBuild', 'deploy']);
    grunt.registerTask('ci', ['verify', 'clean', 'resolve', 'copyResources', 'runTestsCi']);

};
