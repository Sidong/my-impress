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
			files: ['Gruntfile.js', 'js/src/*.js'],
			//配置JSHint (参考文档:http://www.jshint.com/docs)
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},
		// js代码联合
		concat: {
			options: {
				//定义一个用于插入合并输出文件之间的字符
				separator: ';',
			},
			scripts: {
				src: ['js/src/*.js'],
				dest: 'js/build/<%= pkg.name %>.js'
			},
			vendor: {
				src: ['js/vendor/*.js'],
				dest: 'js/build/vendor.js'
			}
		},
		// js代码压缩
		uglify: {
			options: {
				//生成一个banner注释并插入到输出文件的顶部
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			scripts: {
				files: {
					'js/build/<%= pkg.name %>.min.js': ['<%= concat.scripts.dest %>']
				}
			},
			vendor: {
				files: {
					'js/build/vendor.min.js': ['<%= concat.vendor.dest %>']
				}
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
		// connect: {
		// server: {
		// options: {
		// port: 9001,
		// hostname: '0.0.0.0',
		// base: '.'
		//      }
		//    }
		//  },
		// 清除文件和目录
		clean: {
			build: ['css/prefixer/*.css', 'css/build/*.css', 'js/build/*.js'],
			release: []
		},
		// 观察
		watch: {
			options: {
				livereload: true,
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
			scripts: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'concat:scripts', 'uglify:scripts'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: [
					'css/*.css'
				],
				tasks: ['autoprefixer', 'cssmin:min'],
				options: {
					spawn: false,
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['clean:build', 'jshint', 'concat', 'uglify', 'autoprefixer', 'cssmin']);
	grunt.registerTask('default', ['clean:build', 'jshint', 'concat', 'uglify', 'autoprefixer', 'cssmin', 'watch']);

};
