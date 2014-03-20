module.exports = function(grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// 压缩图片
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
		// js代码检测
		jshint: {
			// 定义用于检测的文件
			files: ['Gruntfile.js', 'js/src/*.js', 'js/main.js'],
			//配置JSHint (参考文档:http://www.jshint.com/docs)
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},
		// css代码前缀补全
		autoprefixer: {
			options: {
				browsers: ['last 2 version', '> 5%', 'ie 8', 'ie 9']
			},
			// 没有提供dest将默认覆盖源文件
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'css/*.css',
				dest: 'css/prefixer/'
			}
		},
		// css联合压缩
		cssmin: {
			min: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				files: {
					'css/build/<%= pkg.name %>.min.css': ['css/prefixer/*.css']
				}
			}
		},
		// 清除文件和目录
		clean: {
			build: ['css/prefixer/*.css', 'css/build/*.css', 'js/build/*.js'],
			release: []
		},
		requirejs: {
			js: {
				options: {
					// appDir: "js/",
					baseUrl: 'js/',
					mainConfigFile: 'js/config.js',
					// dir: 'js/build',
					keepBuildDir: false,
					// modules: [
					// { name: 'main' }
					// ],
					name: "main",
					out: 'js/build/main.js',
					optimize: "uglify",
					// uglify: {
					// toplevel: true,
					// ascii_only: true,
					// beautify: true,
					// max_line_length: 1000
					// }
					fileExclusionRegExp: /^\./
				}
			}
		},
		// 观察
		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: ['index.html'],
			},
			image: {
				files: [
					'<%= imagemin.dynamic.files[0].cwd %>' + '<%= imagemin.dynamic.files[0].src %>'
				],
				tasks: ['imagemin'],
				options: {
					spawn: false,
				}
			},
			jshint: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint'],
				options: {
					spawn: false,
				}
			},
			requirejs: {
				files: ['js/*.js', 'js/src/*.js'],
				tasks: ['requirejs'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: [
					'css/*.css'
				],
				tasks: ['autoprefixer', 'cssmin'],
				options: {
					spawn: false,
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['clean', 'jshint', 'autoprefixer', 'cssmin', 'requirejs']);
	grunt.registerTask('default', ['build']);

};
