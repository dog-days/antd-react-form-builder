var webpack = require('webpack')
var webpack_config = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    webpack: {
      production: webpack_config,
    },
    compress: {
      main: {
        options: {
          mode: 'zip',
					archive: function(){
						return './public/publish-' + grunt.template.today('yyyymmddHHMMss') + '.zip';
					}
        },
        expand: true,
        cwd: 'public/',
        src: ['**/*'],
      }
    },
		clean: {
			folder: ['public']
		}
    
  });
  //grunt.loadNpmTasks('grunt-contrib-compass');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-string-replace');	
  //grunt.loadNpmTasks('grunt-contrib-htmlmin');
  //grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');	
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.registerTask("default", ['clean','webpack','compress']);
}
