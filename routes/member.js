var express = require('express');
var router = express.Router();
var models  = require('../model/db');

router.post('/login', function(req, res, next) {
  console.log(req.body);
});

router.get('/:member_id', function(req, res) {
  models.member.findOne({
    where: {
      member_id: req.params.member_id
    }
  }).then(function(member) {
    res.json(JSON.parse(JSON.stringify(member)));
  });
});

module.exports = router;
