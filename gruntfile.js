/*global module:false*/
module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
          '* Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          ' */\n'
      },
      main: {
        src: ['src/chn.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      main: {
        src: ['<%= concat.main.dest %>'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    compress: {
      options: {
        mode: 'gzip'
      },
      main: {
        files: [
          {
            src: "dist/<%= pkg.name %>-<%= pkg.version %>.js",
            dest: "dist/<%= pkg.name %>-<%= pkg.version %>.js.gz"
          },
          {
            src: "dist/<%= pkg.name %>-<%= pkg.version %>.min.js",
            dest: "dist/<%= pkg.name %>-<%= pkg.version %>.min.js.gz"
          }
        ]
      }
    },
    jshint: {
      options: {
        browser: true,
        asi: false,
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        plusplus: true,
        sub: true,
        strict: true,
        unused: true,
        undef: true,
        trailing: true,
        boss: true,
        eqnull: true,
        white: true
      },
      main: {
        files: {
          src: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js', '!**/qunit*']
        }
      }
    },
    watch: {
			files: ['<%= jshint.main.files.src %>'],
      tasks: ['jshint']
    }
    /****
     * Test task is not included because Phantom.js does not support harmony proxies yet.
     * You can manually run the test in any browser that does support proxy objects.
     */
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compress']);
};
