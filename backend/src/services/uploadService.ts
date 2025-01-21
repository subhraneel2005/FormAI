import {supabase} from "./supabase"

interface UploadFile {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  }

  export async function uploadFile(file: UploadFile) {  
    try {  
      const fileName = `${Date.now()}-${file.originalname}`;  
      
      const { data, error } = await supabase.storage  
        .from('pdfs')  
        .upload(fileName, file.buffer, {  
          contentType: file.mimetype,  
          cacheControl: '3600'
        });  
  
      if (error) {  
        console.error('Detailed Supabase Error:', {  
          message: error.message
        });  
        throw error;  
      }  
  
      const { data: { publicUrl } } = supabase.storage  
        .from('pdfs')  
        .getPublicUrl(fileName);  
  
      return {  
        fileName,  
        publicUrl,  
        originalName: file.originalname  
      };  
    } catch (error) {  
      console.error('Full Upload Error:', error);  
      throw new Error('Failed to upload file to storage');  
    }  
  }