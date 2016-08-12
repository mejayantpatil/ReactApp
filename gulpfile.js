var gulp = require('gulp');
var concat = require('gulp-concat');
var exec = require('child_process').exec;
gulp.task('default', function() {
	//
	gulp.src(['js/comment.js','js/commentForm.js','js/commentList.js','js/commentBox.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('build/js'));
	//
	console.log('done');		
  // place code for your default task here
});

gulp.task('start', function(){
	exec('http-server', function(){
		comsole.log('server has been started...!');
	});	
});