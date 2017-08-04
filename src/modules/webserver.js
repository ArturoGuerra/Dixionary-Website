module.exports = function (app, config, express) {

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/dixionary', (req, res) => {
        res.render('dixionary', {
            fetchUrl: `${config.host}/assets/data.json`
        })
    });

    app.use(function (req, res, next) {
        res.redirect('/');
    })
};