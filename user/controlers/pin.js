const pin = (req, res) => {
  res.status(200).json({
    message: "Server Live and Running"
  });
};

module.exports = pin;