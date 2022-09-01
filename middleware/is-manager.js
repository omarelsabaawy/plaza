module.exports = (req, res, next) => {
    if (!req.user.isManager) {
        return res.status(404).render('404', {
            pageTitle: '404 Error page not found',
            path: '/404',
            isAuth: req.session.isLoggedIn,
            user: req.user
        });
    }
    next();
};