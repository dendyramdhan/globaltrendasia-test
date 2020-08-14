const { validationResult } = require("express-validator");
const userService = require("../_services").user;
const response = require("../_helpers").response;

module.exports = {
  authenticate(req, res, next) {
    console.log(req.body, "req.body");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors.array()[0].msg);

    userService
      .authenticate(req.body)
      .then((user) =>
        user
          ? res.json({ ...response, data: { token: user.token } })
          : res.status(400).json({
              ...response,
              success: false,
              error: "Username or password is incorrect",
            })
      )
      .catch((err) => next(err));
  },
};
