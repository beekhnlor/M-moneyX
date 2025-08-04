const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = process.env.SECRETKEY
const connected = require('../connectdb/connecting')
const querise = require('../queries/query')

const register = async(req,res)=> {
    const  { user_name,email,phone_number,password} = req.body
    try{

        const [ CheckUser ] = await connected.query(querise.CheckUser,[email,phone_number])

        if(CheckUser.length){
            return res.status(400).json({message:"User Already Exit!"})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const [ result ] = await connected.query(querise.register,[
            user_name,
            email,
            phone_number,
            hashPassword,
            new Date(),
            new Date(),
        ])

        return res.status(200).json({message:"Register Success"})

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const login = async(req,res)=>{
    const { email,password } = req.body

    try{

        const [ loginUser ] = await connected.query(querise.login,[email])

        if(loginUser.length === 0){
            return res.status(400).json({message:"Login Invalid"})
        }

        const user = loginUser[0]

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"Password is not Match"})
        }

        const payload = {
            id: user.id,
            email:user.email,
            phone_number:user.phone_number,
            role:user.role,
        }
        
        const token = jwt.sign(payload,secretkey,{expiresIn:'1h'})

        return res.status(200).json({message:"Login Success",
            payload,
            token
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}


module.exports = {
    register,
    login
}
