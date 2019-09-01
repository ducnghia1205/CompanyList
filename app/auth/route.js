const controller = require('./controller');
const { loginFacebookValidator, userValidator } = require('../../helpers/validation');
const methods = require('../../configs/methods');

module.exports = (route)=>{
  route.post('/users',userValidator(methods.CREATE), controller.createUser);
  route.post('/login',loginFacebookValidator(), controller.login);
  route.post('/loginWithEmail', controller.loginWithEmail);

};
