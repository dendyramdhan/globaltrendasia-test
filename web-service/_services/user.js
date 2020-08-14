const User = require('../_models/index').User;
const config = require('../_configs/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async authenticate({ email, password }) {
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password']
    });
    
    if (user && bcrypt.compareSync(password, user.dataValues.password)) {
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
          token
      };
    }
  },
};