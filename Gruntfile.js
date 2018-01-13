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
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          'static/css/main.min.css': 'bulma/bulma.sass'       // 'destination': 'source'
        }
      }
    },
    uncss: {
      dist: {
        files: {
          'static/css/main.min.css': ['index.html']
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'static/index.html': ['index.html']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-processhtml');

  // Default task.
  // Compile sass big.
  // UNCSS and minify.
  // Stash in Static.
  // Update HTML to use new minified CSS and stash in static.
  grunt.registerTask('default', ['sass', 'uncss', 'processhtml']);

};
