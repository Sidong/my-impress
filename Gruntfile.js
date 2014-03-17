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
			//定义用于检测的文件
			files: ['Gruntfile.js', 'js/src/*.js'],
			//配置JSHint (参考文档:http://www.jshint.com/docs)
			options: {
				// 进入严格模式,要求你使用'use strict;'语法
				"strict" :true,
				// 禁用位运算操作符
				"bitwise": true,
				// 浏览器模式
				"browser": true,
				// 要求所有的非全局变量，在使用前都被声明
				"undef": true,
				// 提醒定义了、但未使用过的的变量、函数
				"unused": true,
				// 要求你在使用if和while等结构语句时加上{}来明确代码块
				"curly": true,
				// 使用全等操作符
				"eqeqeq": true,
				// 对于首字母大写的函数(声明的类),强制使用new
				"newcap": true,
				// 禁止arguments.caller和arguments.callee的使用
				"noarg": true,
				// 依据严格的空白规范检查你的代码
				// "white": true,
				// 允许在if，for，while里面编写赋值语句
				"boss": true,
				//你可以在这里重写jshint的默认配置选项
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		concat: {
			options: {
				//定义一个用于插入合并输出文件之间的字符
				separator: ';'
			},
			dist: {
				src: ['js/src/*.js'],
				dest: 'js/build/<%= pkg.name %>.js'
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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['imagemin', 'jshint', 'concat', 'uglify', 'watch']);

};
