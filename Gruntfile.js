module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      js: {
        src: [
          "node_modules/bootstrap/dist/js/bootstrap.min.js",
          "node_modules/fslightbox/index.js",
          "node_modules/@glidejs/glide/dist/glide.min.js",
          "assets/_main.js",
        ],
        dest: "_site/assets/main.js"
      },
      css: {
        src: [
          "_site/assets/css/main.css",
          "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
          "node_modules/@glidejs/glide/dist/css/glide.core.min.css",
          "node_modules/@glidejs/glide/dist/css/glide.theme.min.css",
        ],
        dest: "_site/assets/css/main.css"
      }
    },
    purgecss: {
      css: {
        options: {
          content: ["_site/*.html", "_site/**/*.html"],
          whitelist: ["materialbox-overlay", "glide__bullet--active"]
        },
        files: {
          "_site/assets/css/main.css": ["_site/assets/css/main.css"]
        }
      }
    },
    copy: {
      fontawesome: {
        expand: true,
        cwd: 'node_modules/@fortawesome/fontawesome-free/webfonts',
        src: "**",
        dest: "_site/assets/webfonts"
      },
    },
    uglify: {
      build: {
        src: '_site/assets/main.js',
        dest: '_site/assets/main.js'
      }
    },
    watch: {
      scripts: {
        files: ["_site/index.html"],
        tasks: ["concat", "purgecss", "copy"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-purgecss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'purgecss', 'copy', 'uglify']);
  grunt.registerTask('serve', ['concat', 'purgecss', 'copy', 'watch']);
};