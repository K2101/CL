const auth = (req, res, next) => {
  // check credentials here.
  console.log('authenticated!')

  next();
};

module.exports = auth;
