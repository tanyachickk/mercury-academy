module.exports = {
    source: './src',
    dest: './build',
    js: {
        src: ['src/scripts/login.js', 'src/scripts/main.js'],
        dest: 'src',
        prodDest: './build',
        watch: 'src/scripts/*.js'
    },
    scss: {
        src: 'src/styles/main.scss',
        dest: 'src',
        prodDest: './build',
        watch: 'src/styles/*.scss'
    },
    html: {
        src: 'src/index.html',
        prodDest: './build',
        watch: 'src/index.html',
    },
    images: {
        src: 'src/images/*'
    }
}