module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    autoprefixer: {
      single_file: {
        src: 'css/app.css',
        dest: 'css/app.min.css'
      }
    },

    jshint: {
      beforeconcat: ['js/*.js']
    },

    concat: {
      dist: {
        src: [
          'js/main-libs/jquery.min.js',
          'js/main-libs/foundation.min.js',
          'js/libs/*.js'
        ],
        dest: 'js/libs.min.js'
      }
    },

    uglify: {
      build: {
        src: ['js/libs.min.js', 'js/app.js'],
        dest: 'js/production.min.js'
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass', 'concat', 'uglify', 'autoprefixer']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin']);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
}