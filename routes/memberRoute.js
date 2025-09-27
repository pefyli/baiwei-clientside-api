var express = require('express');
var router = express.Router();
const memberService = require('../services/memberService');
const bcrypt = require('bcrypt');
const { StatusCode } = require('status-code-enum');

//member authenication
router.post('/authenication', async(req, res) => {
  try{
    const member = await memberService.findMember(req.body.account);
    if(member) {
      bcrypt.compare(req.body.password, member.password).then(async (match) => {
        if(match) {
          let memberInfo = await memberService.findMemberById(member.member_id);
          res.status(StatusCode.SuccessOK).json({data: memberInfo});
        } else {
          res.status(StatusCode.ClientErrorUnauthorized).send("Unauthorized");
        }
      });
    } else {
      res.status(StatusCode.ClientErrorNotFound).send("Member not found");
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
        res.status(StatusCode.ServerErrorNotImplemented).send("Error when hashing password");
      }
      const hasMember = await memberService.hasMember(req.body.account);
      if (!hasMember) {
        await memberService.addMember(req.body.member_name, req.body.account, hash, req.body.phone, req.body.address) 
        .then(() => {
          res.status(StatusCode.SuccessCreated).send("Member created");
        })
        .catch((err) => {
          res.status(StatusCode.ServerErrorInternal).send(err.toString());
        });
      } else {
        res.status(StatusCode.SuccessOK).send();
      }
    });
    } catch (error) {
      next(error);
    }
});

//get Member info
router.get('/:member_id', async (req, res, next) => {
  try {
    const member = await memberService.findMemberById(req.params.member_id); 
    res.status(StatusCode.SuccessOK).json({data: member});
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
        res.status(StatusCode.SuccessOK).send("Member deleted");
      }
    } else {
      res.status(StatusCode.ServerErrorInternal).send("Member not found")
    }
  } catch (error) {
    next(error);
  }
});

//member info update
router.put('/:member_id', async (req, res, next) => {
  try {
    const member = await memberService.updateMemberInfo(req.params.member_id, req.body); 
    res.status(StatusCode.SuccessOK).json({data: member});
  } catch (error) {
    next(error);
  }
});

//get member info
router.get('/:member_id', async (req, res, next) => {
  try {
    const member = await memberService.findMemberById(req.params.member_id); 
    res.status(StatusCode.SuccessOK).json({data: member});
  } catch (error) {
    next(error);
  }
});

//member password update
router.put('/:member_id/password', async (req, res, next) => {
  try {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
        res.status(StatusCode.ServerErrorNotImplemented).send("Error when hashing password");
      }
      await memberService.updatePassword(req.params.member_id, hash);
      res.status(StatusCode.SuccessNoContent).send();
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
