var express = require('express');
var router = express.Router();
const memberService = require('../services/memberService');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { StatusCode } = require('status-code-enum');

//member authenication
router.post('/authenication', async(req, res) => {
  try{
    const member = await memberService.findMember(req.body.account);
    if(member) {
      bcrypt.compare(req.body.password, member.password).then((match) => {
        if(match) {
          res.status(StatusCode.SuccessOK).json({ message: "Authorized" });
        } else {
          res.status(StatusCode.ClientErrorUnauthorized).json({ message: "Unauthorized" });
        }
      });
    } else {
      res.status(StatusCode.SuccessOK).json({ message: "Member not found" });
    }
  } catch (error) {
    next(error);
  } 
});

//member registration
router.post('/', (req, res, next) => {
  try {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
        res.status(StatusCode.ServerErrorNotImplemented).json({ message: "Error when hashing password" });
      }
      const hasMember = await memberService.hasMember(req.body.account);
      if (!hasMember) {
        await memberService.addMember(req.body.member_name, req.body.account, hash, req.body.phone, req.body.address) 
        .then(() => {
          res.status(StatusCode.SuccessCreated).json({ message: "Member created"});
        })
        .catch((err) => {
          res.status(StatusCode.ServerErrorInternal).json({ message: err.toString()});
        });
      } else {
        res.status(StatusCode.SuccessNoContent).send();
      }
    });
    } catch (error) {
      next(error);
    }
});

//member deletion
router.delete('/:member_id', async (req, res, next) => {
  try {
    const member = await memberService.findMemberById(req.params.member_id); 
    if(member) {
      const deleted = await memberService.deleteMember(req.params.member_id);
      if(deleted) {
        res.status(StatusCode.SuccessOK).json({ message: "Member deleted"});
      }
    } else {
      res.status(StatusCode.SuccessNoContent).send();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
