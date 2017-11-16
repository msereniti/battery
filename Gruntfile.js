module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scriptsJS: {
        files: ['render_src/*.jsx'],
        tasks: ['react', 'uglify'],
        options: {
          spawn: false,
        },
      },
      scriptsCSS: {
        files: ['render_src/*.sass'],
        tasks: ['sass', 'cssmin'],
        options: {
          spawn: false,
        },
      },
      scriptsHTML: {
        files: ['render_src/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false,
        },
      },
    },
    react: {
      client: {
        src: 'render_src/main.jsx',
        dest: 'render/main.js',
      }
    },
    uglify: {
      my_target: {
        files: {
          'render/main.js': 'render/main.js'
        }
      }
    },
    sass: {                              
      dist: {                            
        options: {                       
          style: 'expanded'
        },
        files: {                         
          'render/main.css': 'render_src/main.sass',       
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'render/index.html': 'render_src/index.jade'
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'render/main.css': 'render/main.css'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  // grunt.registerTask('default', ['react', 'uglify', 'jade', 'sass', 'cssmin']);
  grunt.registerTask('default', ['watch']);
}