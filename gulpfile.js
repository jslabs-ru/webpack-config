const path = require('path');
const fs = require('fs');
const { fork } = require('child_process');
const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence');
const webpack = require('webpack');
const rimraf = require('rimraf');
const chalk = require('chalk');

var appProcess;

function writeFileToItself(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    setTimeout(() => {
        fs.writeFileSync(filePath, content);
    }, 300);
}

function buildWithWebpack(callback) {
    var config = require(path.join(__dirname, 'webpack.config.js'));
    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (stats.hasErrors()) {
            const info = stats.toJson();
            info.errors.forEach(error => {
                console.error('Webpack error:', error);
            });
        } else {
            console.log(`Build succeeded, hash: ${chalk.green(stats.hash)}`);
        }
        callback();
    });
}

gulp.task('buildWithWebpack', buildWithWebpack);

function restartServer() {
    console.log('Restart server');
    if(appProcess) appProcess.kill();
    appProcess = fork(__dirname + '/server.js');

    appProcess.on('error', (err) => {
        console.error('Failed to start subprocess.', err);
    });
}

gulp.task('restartServer', restartServer);

var i = 0;

gulp.task('watch', function() {
    gulp
        .watch([
            'src/*'
        ])
        .on('change', function(file) {
            console.log(chalk.green('File changed:'), file);
            runSequence('buildWithWebpack', 'restartServer');
        });

    /* Write file to itself only once to build & restart after gulp watch call */
    if(i === 0) {
        writeFileToItself(path.join(__dirname, 'src', 'main.js'));
        i++;
    }
});

gulp.task('cleanup', async function() {
    await rimraf('dist', () => {
        console.log('Done');
    });
})
