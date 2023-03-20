const indexController = require('../controllers/index.controller')

module.exports = app => {
    app.get('/', indexController.indexPageRender)

    app.get('/login',indexController.loginPageRender)
    
    app.get('/signup', indexController.signupPageRender)

    app.get('/client-dashboard',indexController.dashboardPageRender)

    app.get('/register-land',indexController.registerLandPageRender)

    app.get('/registered-lands-list',indexController.registeredLandsList)

    app.get('/admin-signup-page',indexController.adminSignupPageRender)

    app.get('/admin-dashboard', indexController.adminDashboardPageRender)

    app.get('/posted-lands', indexController.postedLands)

    app.get('/logout', indexController.logoutPage)

    app.get('/tranfer-land',indexController.tranferLandPageRender)

}