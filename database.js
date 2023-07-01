
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Users = require('./model/user');
const TodoLists = require('./model/todoLists');

router.get('/', async (req, res) => {
    res.status(200).send("555");
})

router.post('/register', async (req, res) => {
    try {
        const { name, user_name, email, profile_pic } = req.body;
        const old_user = await Users.findOne({ email: email });
        if (old_user) {
            return res.status(409).send("Already have an account.");
        }
        else {
            const new_user = await Users.create({
                name: name,
                user_name: user_name,
                email: email,
                profile_pic: profile_pic,
            })
            const token = jwt.sign(
                { id: new_user._id },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "10d",
                }
            );
            new_user.token = token;
            return res.status(200).send({
                token: token,
                data: new_user,
            });
        }

    } catch (error) {
        console.log(error);

    }
});

router.post('/login', async (req, res) => {

    try {
        const { email } = req.body;
        const user = await Users.findOne({ email });

        if (user) {
            const token = jwt.sign(
                { id: user._id },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "10d",
                }
            );
            console.log("token ymdaa", token);

            return res.status(200).json({
                token: token,
                data: user,
            });
        }
        return res.status(400).send("Invalid Credentials");

    } catch (error) {
        console.log(error);
    }

});

router.get('/userdata', auth, async (req, res) => {
    await Users.findById(req.user_id).then((data) => {
        res.status(200).send(data);
    });
})
router.get('/update_user', auth, async (req, res) => {
    await Users.findByIdAndUpdate(req.user_id, req.body);
    res.status(200).send("update");
})

router.get('/todolists', auth, async (req, res) => {
    await TodoLists.find({ user_id: req.user_id }).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        console.log(error);
    });
});

router.get('/doinglist', auth, async (req, res) => {
    const doinglists = [];
    await TodoLists.find({ user_id: req.user_id }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].is_done) {
                doinglists.push(data[i]);
            }
        }
        res.status(200).send(doinglists);
    }).catch((error) => {
        console.log(error);
    });
});

router.get('/donelist', auth, async (req, res) => {
    const donelists = [];
    await TodoLists.find({ user_id: req.user_id }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].is_done) {
                donelists.push(data[i]);
            }
        }
        res.status(200).send(donelists);
    }).catch((error) => {
        console.log(error);
    });
});

router.post('/create_todo', auth, async (req, res) => {
    const { name, desc, start_date, end_date } = req.body;

    await TodoLists.create({
        user_id: req.user_id,
        name: name,
        desc: desc,
        start_date: start_date,
        end_date: end_date,
    });
    res.status(200).send("create");
});

router.post('/update_todo', auth, async (req, res) => {
    
    await TodoLists.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).send("update");
});

router.post('/delete_todo', auth, async (req, res) => {
    const { todo_id } = req.body;
    console.log(todo_id);
    await TodoLists.findByIdAndDelete(todo_id);
    res.status(200).send("delete");
})


module.exports = router;