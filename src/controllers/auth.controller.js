const db = require('../db');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');


class AuthController {


    async register(req, res) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'некорректные данные при регистрации'
                })
            }

            const { username, email, password } = req.body;
            const candidate = User.findByEmail(email);
            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' });
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            User.createUser(username, email, hashedPassword)
            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
        }
    }


    async login(req, res) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            const { email, password } = req.body;
            const user = User.findByEmail(email);
            const isMatch = await bcrypt.compare(password, user.hash);

            if (!isMatch || !user) {
                return res.status(400).json({ message: 'неверный логин или пароль' });
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            res.json({token, userId: user.id})


        } catch (e) {
            res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
        }
    }
}

module.exports = new AuthController();