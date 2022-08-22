module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      mainjs: {
        src: ["node_modules/bootstrap/dist/js/bootstrap.min.js"],
        dest: "_site/assets/main.js"
      },
      fslightbox: {
        src: ["node_modules/fslightbox/index.js"],
        dest: "_site/assets/fslightbox.js"
      },
      glide: {
        src: [
          "node_modules/@glidejs/glide/dist/glide.min.js",
          "assets/_glide.config.js"
        ],
        dest: "_site/assets/glide.js"
      },
      alpinejs: {
        src: ['node_modules/alpinejs/dist/alpine.js'],
        dest: '_site/assets/alpine.js'
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
          whitelist: ["glide__bullet--active"]
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
      }
    },
    uglify: {
      mainjs: {
        src: '_site/assets/main.js',
        dest: '_site/assets/main.js'
      },
      fslightbox: {
        src: "_site/assets/fslightbox.js",
        dest: "_site/assets/fslightbox.js",
      },
      glide: {
        src: "_site/assets/glide.js",
        dest: "_site/assets/glide.js",
      },
      alpinejs: {
        src: '_site/assets/alpine.js',
        dest: '_site/assets/alpine.js'
      }
    },
    watch: {
      scripts: {
        files: ["_site/index.html"],
        tasks: ["concat", "copy"]
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
  grunt.registerTask('serve', ['concat', 'copy', 'watch']);
};
