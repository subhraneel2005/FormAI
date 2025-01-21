import { Router } from "express";
import multer from 'multer';
import { uploadFile } from "../services/uploadService";
import { extractTextFromPdf } from "../services/parsingService";
import { nlpService } from "../services/nlpService";
import { signIn, signUp } from "../services/auth/auth";
import { authMiddleware } from "../services/authMiddleware";
import prisma from "../db/prisma";

export const router = Router();

const upload = multer({storage: multer.memoryStorage()})



router.post('/upload', authMiddleware ,upload.single('file') ,async(req:any,res) => {
    const userId = req.userId;
    try {
        if(!req.file){
            res.status(400).json({
                message: "No file provided"
            })
        }
        if(!req.file?.mimetype || !req.file.mimetype.includes('pdf')){
            res.status(400).json({
                message: "Please uplaod a pdf file"
            })
        }

        const uploadedFile = await uploadFile(req.file!);
        const parsedText = await extractTextFromPdf(req.file?.buffer!)

        const newData = await prisma.data.create({
            data:{
                text: parsedText!,
                file:uploadedFile,
                user:{
                    connect:{
                        id: userId
                    }
                }
            }
        })

        res.status(200).json({
            data: {
                savedData: newData
            },
            message: "Upload service is working sucessfully"
        })
    } catch (error) {   
        console.log("Error: ", error);
    }
})

router.get('/nlp/:dataId',authMiddleware, async(req:any,res) => {
    const {dataId} = req.params;
    const userId = req.userId;
    try {

        const data = await prisma.data.findUnique({
            where:{
                id: dataId,
                userId: userId
            },
            include:{
                user: true
            }
        });

        
        
        const text = data?.text;
        console.log(text);
        const nlpResult = await nlpService(text!);
        
        res.status(200).json({
            message: "NLP Service success",
            data: nlpResult
        })
        
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.post("/signup",signUp)

router.post("/signin",signIn)

router.get("/logout", (req, res) => {
    //invalidating the token by clearing the cookie
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    })
});