"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"

export default function Upload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")
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
      console.log(result);
      
      router.push(`/form/${result.data.savedData.id}`)
    } catch (error: any) {
      setError(error.message)
      setUploadProgress(0)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Upload PDF</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center ${
          isDragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg">Drop the PDF file here</p>
        ) : (
          <p className="text-lg">Drag and drop a PDF file here, or click to select a file</p>
        )}
        <p className="text-sm text-gray-500 mt-2">Maximum file size: 10MB</p>
      </div>
      {uploadProgress > 0 && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-center mt-2">{uploadProgress}% uploaded</p>
        </div>
      )}
    </div>
  )
}