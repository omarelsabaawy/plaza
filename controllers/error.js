exports.get404 = (req, res, next) => {
    let totalQuantity = 0;

    if (req.user != null) {
        for (item of req.user.cart.items) {
            totalQuantity += item.quantity;
        }
    }

    res.render('404', {
        pageTitle: '404 Error page not found',
        path: '/404',
        isAuth: req.session.isLoggedIn,
        user: req.user,
        totalQuantity: totalQuantity
    });
};