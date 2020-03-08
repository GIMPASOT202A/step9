const express = require('express');

const adminRoute = express.Router();

function router(nav) {
  adminRoute.route('/')
    .get((req, res) => {
      res.send('insert records');
    });
  return adminRoute;
}

module.exports = router;
