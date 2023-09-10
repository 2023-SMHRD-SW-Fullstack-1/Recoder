const bcrypt = require('bcrypt')
const passport = require('passport')
const { User, Company } = require('../models')

exports.join = async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        id: req.body.id,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.pw, 12);
    await User.create({
      id: req.body.id,
      pw: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['pw']
        },
        include: [{
          model: Company
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
}

exports.logout = (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.send('ok');
  });
}