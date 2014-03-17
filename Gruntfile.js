module.exports = function(grunt) {
	"use strict";

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
			// 定义用于检测的文件
			files: ['Gruntfile.js', 'js/src/*.js'],
			//配置JSHint (参考文档:http://www.jshint.com/docs)
			options: {
				jshintrc: true,
				reporter: require('jshint-stylish')
			}
		},
		concat: {
			options: {
				//定义一个用于插入合并输出文件之间的字符
				separator: ';',
			},
			dist: {
				src: ['js/src/*.js'],
				dest: 'js/build/<%= pkg.name %>.js'
			},
			vendor: {
				src: ['js/vendor/*.js'],
				dest: 'js/build/vendor.js'
			}
		},
		uglify: {
			options: {
				//生成一个banner注释并插入到输出文件的顶部
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'js/build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			},
			vendor: {
				files: {
					'js/build/vendor.min.js': ['<%= concat.vendor.dest %>']
				}
			}
		},
		watch: {
			scripts: {
				files: [
					'<%= imagemin.dynamic.files[0].cwd %>' + '<%= imagemin.dynamic.files[0].src %>',
					'<%= jshint.files %>'
				],
				tasks: ['imagemin', 'jshint', 'concat', 'uglify'],
				options: {
					spawn: false,
				},
			} 
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jshint-stylish');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	// build任务快速搭建
	grunt.registerTask('build', ['imagemin', 'concat', 'concat:vendor', 'uglify', 'uglify:vendor']);
	grunt.registerTask('default', ['imagemin', 'jshint', 'concat', 'concat:vendor', 'uglify', 'uglify:vendor', 'watch']);

};
