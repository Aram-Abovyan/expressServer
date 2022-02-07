const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User, RoleAssignment } = require('../models')

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const hashPassword = bcrypt.hashSync(password, 5)

  const withSameEmail = await User.findAll({
    where: {
      email,
    }
  })

  if (withSameEmail.length) {
    return res.json({message: 'user exists'})
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword
  })

  // await RoleAssignment.create({
  //   userId: +user.id,
  //   roleId: 1
  // }).catch(e => console.log('ERRRRRR', e))
  

  const expiresIn  =  24  *  60  *  60
  const accessToken = jwt.sign({email: user.email}, process.env.SECRET_KEY, { expiresIn })

  res.json({user, accessToken})
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const users = await User.findAll({
    where: {
      email,
    }
  })

  if (!users.length) {
    return res.json({message: 'user does not exist'})
  }

  const result = bcrypt.compareSync(password, users[0].password)

  if (!result) {
    return res.json({message: 'wrong password'})
  }

  const  expiresIn  =  24  *  60  *  60
  const accessToken = jwt.sign({email: users[0].email}, process.env.SECRET_KEY, { expiresIn })

  res.json({user: users[0], accessToken})
})

module.exports = router