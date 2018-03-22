let userController = require('../controllers/user.controller.js');

module.exports = function(app){
    app.post('/api/user/register', userController.registerUser);
    app.post('/api/user/login', userController.loginUser);
};