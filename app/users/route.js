const controller = require('./controller');
const { userValidator } = require('../../helpers/validation');
const methods = require('../../configs/methods');

module.exports = (route)=>{
  route.get('/users', controller.getListUsers);
  route.post('/users',userValidator(methods.CREATE), controller.createUser);
  route.put('/users/:id',userValidator(methods.UPDATE), controller.updateUser);
  route.delete('/users/:id',userValidator(methods.DELETE), controller.deleteUser);
};
