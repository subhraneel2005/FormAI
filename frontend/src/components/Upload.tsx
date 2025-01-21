"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, FileUp } from "lucide-react"

export default function UploadForm() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      uploadFile(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10000000, // 10MB
    multiple: false
  })

  const uploadFile = async (file: File) => {
    setError("")
    setIsLoading(true)
    setUploadProgress(0)
    
    const formData = new FormData()
    formData.append("file", file)

    try {
      const token = sessionStorage.getItem("authToken")
      if (!token) {
        router.push("/signin")
        return
      }

      const response = await fetch("https://formai-mwwx.onrender.com/api/v1/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Upload failed")
      }

      const result = await response.json()
      setUploadProgress(100)
      
      // Small delay to show completion before redirect
      setTimeout(() => {
        router.push(`/form/${result.data.savedData.id}`)
      }, 500)

    } catch (error) {
      setError(error as string)
      setUploadProgress(0)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Upload PDF</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div 
          {...getRootProps()} 
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors duration-200
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
            ${isLoading ? 'pointer-events-none opacity-50' : 'hover:border-primary'}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {isLoading ? (
              <Upload className="h-10 w-10 animate-pulse" />
            ) : (
              <FileUp className="h-10 w-10" />
            )}
            {isDragActive ? (
              <p className="text-lg font-medium">Drop the PDF file here</p>
            ) : (
              <p className="text-lg font-medium">
                Drag and drop a PDF file here, or click to select
              </p>
            )}
            <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
          </div>
        </div>

        {uploadProgress > 0 && (
          <div className="mt-4 space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-center text-gray-500">
              {uploadProgress}% uploaded
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}