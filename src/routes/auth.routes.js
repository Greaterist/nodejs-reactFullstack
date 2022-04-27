const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const router = Router();
const { check } = require('express-validator')

router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'минимальная длина пароля 8 символов').isLength({ min: 6 })
],
    authController.register);


router.post('/login',[
    check('email', 'Введен некорректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
],
 authController.login);


module.exports = router;