module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      js: {
        src: [
          "node_modules/jquery/dist/jquery.min.js",
          "node_modules/bootstrap/dist/js/bootstrap.min.js",
          "node_modules/materialize-css/js/global.js",
          "node_modules/materialize-css/js/anime.min.js",
          "node_modules/materialize-css/js/component.js",
          "node_modules/materialize-css/js/cash.js",
          "node_modules/materialize-css/js/materialbox.js",
          "assets/_main.js",
        ],
        dest: "_site/assets/main.js"
      },
      css: {
        src: [
          "_site/assets/css/main.css",
          "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
        ],
        dest: "_site/assets/css/main.css"
      }
    },
    uglify: {
      build: {
        src: '_site/assets/main.js',
        dest: '_site/assets/main.js'
      }
    },
    copy: {
      fontawesome: {
        expand: true,
        cwd: 'node_modules/@fortawesome/fontawesome-free/webfonts',
        src: "**",
        dest: "_site/assets/webfonts"
      }
    },
    watch: {
      scripts: {
        files: ["_site/index.html"],
        tasks: ["concat", "uglify", "copy"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'copy', 'watch']);

};