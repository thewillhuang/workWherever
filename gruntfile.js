'use strict';

module.exports = function(grunt) {
  var srcFiles = [
    '*.js',
    'lib/**/*.js',
    'lib/**/*.js',
    'routes/**/*.js'
  ];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      all: srcFiles,
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: srcFiles,
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      src: ['test/**/*.js']
    }
  });
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['test']);
};
