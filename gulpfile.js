'use strict';

var
  gulp      = require( 'gulp' ),
  plugins   = require( 'gulp-load-plugins' )(),

  // Keeps track of all the different files and their type for linting.
  fileTypes = {
    json: [ __dirname + '/package.json', __dirname + '/.jshintrc' ],
    browser: [ ],
    node: [ __dirname + '/gulpfile.js' ]
  },
  // This files are added by others when this module is `require`d and allows
  // this workflow to be extended.
  addFiles = {
    node: [],
    browser: [],
    json: []
  };

// Expose the addFiles object so that other gulpfiles can add to the linting
// tasks. This allows this repository to be a "sub-module" of an existing
// repository.
exports = module.exports = addFiles;

//
// Linting is the process of identifing usage of unidomatic features of
// language. This is a tool to prevent bugs by warning the programmer of the
// useage of "bad" features.
//

gulp.task( 'lint-node', function() {
  var files = fileTypes.node.concat( addFiles.node );

  return gulp.src( files )
    .pipe( plugins.jshint( {
      node: true
    } ) )
    .pipe( plugins.jshint.reporter( 'jshint-stylish') );
} );

gulp.task( 'lint-browser', function() {
  var files = fileTypes.browser.concat( addFiles.browser );

  return !files.length ? true : gulp.src( files )
    .pipe( plugins.jshint( {
      browser: true
    } ) )
    .pipe( plugins.jshint.reporter( 'jshint-stylish' ) );
} );

// JSON linting
gulp.task( 'lint-json', function() {
  var files = fileTypes.json.concat( addFiles.json );

  return gulp.src( files )
    .pipe( plugins.jsonlint() )
    .pipe( plugins.jsonlint.reporter() );
} );

gulp.task( 'default', function() {

  var
    helpMessage = [
      '',
      '  Available Tasks',
      '  ---------------',
      '',
    ],
    tasks = Object.keys( gulp.tasks ).map( function( taskName ) {
      return '  ' + taskName;
    } );

  console.log( helpMessage.concat( tasks ).concat( [ '' ] ).join( '\n' ) );

} );

