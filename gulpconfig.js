module.exports = {
    source: './src',
    dest: './build',
    js: {
        src: 'src/scripts/*.js',
        dest: 'src',
        prodDest: 'build',
        watch: 'src/scripts/*.js'
    },
    scss: {
        src: 'src/styles/main.scss',
        dest: 'src',
        prodDest: 'dist',
        watch: 'static/styles/**/*.scss'
    },
    html: {
        src: 'src/index.html',
        prodDest: 'dist',
        watch: 'src/index.html',
    },
    assets: {
        src: 'src/assets/**',
        prodDest: 'src/assets'
    },
    images: {
        src: 'src/assets/images/**/*'
    }
}