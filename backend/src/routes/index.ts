import { Router } from "express";
import multer from 'multer';
import { uploadFile } from "../services/uploadService";
import { extractTextFromPdf } from "../services/parsingService";

export const router = Router();

const upload = multer({storage: multer.memoryStorage()})

router.post('/upload', upload.single('file') ,async(req,res) => {
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

        res.status(200).json({
            data: {
                file: uploadedFile,
                text: parsedText
            },
            message: "Upload service is working sucessfully"
        })
    } catch (error) {   
        console.log("Error: ", error);
    }
})