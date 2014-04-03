module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
					'app/js/commands/commandSet.js',
					'app/js/commands/commands.js',
					'app/js/commands/conversationCommands.js',
					'app/js/game.js',
					'app/js/game_files/conversations.js',
					'app/js/game_files/items.js',
					'app/js/game_files/game-init.js',
					'app/js/engine/engine.js',
					'app/js/engine/area.js',
					'app/js/engine/conversation.js',
					'app/js/engine/display.js',
					'app/js/engine/inventory.js',
					'app/js/engine/parser.js'
				],
				dest: 'app/build/wtae.js'
			}

		},

		copy: {
			main: {
				files: [
					{expand: true, flatten: true, src: ['app/js/libs/*.js'], dest: 'app/build/libs/', filter: 'isFile'}
				]
			}
		},

		uglify: {
			build: {
				src: 'app/build/wtae.js',
				dest: 'app/build/wtae.min.js'
			}
		},

		cssmin: {
			combine: {
				files: {
					'app/build/css/wtae.min.css': ['app/css/*.css']
				}
			}
		},

		clean: ['app/build/wtae.js']
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean')

	grunt.registerTask('default', ['concat', 'copy', 'uglify', 'cssmin', 'clean']);
};