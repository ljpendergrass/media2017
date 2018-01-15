/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'static/css/main.min.css': 'bulma/bulma.sass'       // 'destination': 'source'
        }
      }
    },
    uncss: {
      options: {
        ignore: [
          '.attached',
          'section.media-menu.attached',
          '.navbar-fixed',
          '.menu-attached',
          '.hide',
          '.films',
          'section.media-menu.films',
          'section.media-menu.television',
          '.television',
          'section.media-menu.game',
          'section.media-menu.game span a',

          '.game'
        ],
        report: ['min']
        },
      dist: {
        files: {
          'static/css/main.min.css': ['static/index.html']
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'static/index.html': ['index.html']
        }
      }
    },
    copy: {
      main: {
        expand: true,
        src: 'js/*',
        dest: 'static/',
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  // Compile sass big.
  // UNCSS and minify.
  // Stash in Static.
  // Update HTML to use new minified CSS and stash in static.
  grunt.registerTask('default', ['sass', 'processhtml', 'uncss','copy']);

};
