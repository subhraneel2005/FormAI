import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SigniInSchema, SignupSchema } from "../../types/user";
import prisma from "../../db/prisma";

export const JWT_PASSWORD = "jkjkdsjkdsjkd67%$$%%^&*7889"

export const signUp = async(req:any,res:any) => {
    const {username, email, password} = SignupSchema.parse(req.body);
    if(!username || !password || !email) {
        return res.status(400).json({
            message: "Invalid input"
        })
    }
    else{
        try {
            const hashedPass = await bcrypt.hash(password, 10);
            const userExists = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if(userExists){
                res.status(400).json({
                    message: "User already exists"
                })
            }
            
            const user = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: hashedPass
                }
            });
            return res.status(201).json({
                message: "User created successfully",
                userId: user?.id
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
export const signIn = async(req:any,res:any) => {
    const {username, password} = SigniInSchema.parse(req.body);
    
    if(!username || !password) {
        return res.status(400).json({
            message: "Invalid input"
        })
    }
    else{
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username
                }
            });

            if(!user){
                return res.status(400).json({
                    message: "User not found"
                })
            }

            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid){
                return res.status(400).json({
                    message: "Invalid password"
                })
            }

            const token = jwt.sign({
                userId: user.id
            }, JWT_PASSWORD
            );

            return res.status(200).json({
                message: "User logged in successfully",
                token
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}