const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userCtrl = {
    find: async (req,res) => {
        let found = await UserModel.find({email: req.params.email})
        res.json(found)
    },
    all: async (req, res) => {
        let allUsers = await UserModel.find()
        res.json(allUsers)
    },
    create: async (req, res) => {
        let newUser = new UserModel(req.body)
        let savedUser = await newUser.save()
        res.json(savedUser)
    },
    getAllBusinesses: async (req, res) => {
        let foundUser = await UserModel.find({email: req.params.email}).populate("Businesses")
        res.json(foundUser)
    },
    register: async (req, res) => {
        try {
            const { lastName, firstName, email, password, role } = req.body;

            const user = await UserModel.findOne({ email })
            if (user) return res.status(400).json({ msg: "The email already exists." })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password is at least 6 characters." })

            //Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new UserModel({
                firstName, lastName, email, password: passwordHash, role
            })

            //Save mongoDB
            await newUser.save()


            //Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })

            res.json({ accesstoken })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await UserModel.findOne({email})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg: "Wrong password."})

            //If login success, create access token and refresh token
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

	    res.cookie('userid', user._id, {
                httpOnly: true,
                path: '/',
                maxAge: 7*24*60*60*1000 //7d
	    })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })

            res.json({ accesstoken })

        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {


        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})

            return res.json({msg: "Logged Out"})

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

                res.json({ rf_token })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getUser: async (req, res) =>{
        try {
            const user = await UserModel.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({ msg:"User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserInfo: async (req, res) =>{
        try {
            const userid = req.cookies.userid;
            const user = await UserModel.findById(userid).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addFavourite: async (req, res) =>{
        try {
            const user = await UserModel.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist"})

            await UserModel.findOneAndUpdate({_id: req.user.id}, {
                favourite: req.body.favourite
            })

            return res.json({msg:"Added to favourite"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl
