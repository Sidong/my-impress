module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['*.{png,jpg,gif}'],
					dest: 'img/build/'
				}]
			}
		},
		jshint: {
			//定义用于检测的文件
			files: ['gruntfile.js', 'js/src/*.js'],
			//配置JSHint (参考文档:http://www.jshint.com/docs)
			options: {
				//你可以在这里重写jshint的默认配置选项
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		watch: {
			scripts: {
				files: [
					'<%= imagemin.dynamic.files[0].cwd %>' + '<%= imagemin.dynamic.files[0].src %>',
					'<%= jshint.files %>'
				],
				tasks: ['imagemin'],
				options: {
					spawn: false,
				},
			} 
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['imagemin', 'watch']);

};
