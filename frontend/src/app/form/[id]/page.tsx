"use client"

import { useEffect, useState } from 'react'
import { useParams } from "next/navigation";

interface Field {
  label: string
  value: string
}

interface NLPResponse {
  message: string
  data: {
    fields: Field[]
  }
}

export default function Form() {

  const { id } = useParams();

  const [fields, setFields] = useState<Field[]>([])
  const [error, setError] = useState("")
  const params = useParams()

  useEffect(() => {
    const fetchNlpData = async () => {
      try {
        const token = sessionStorage.getItem("authToken")
        const response = await fetch(`https://formai-mwwx.onrender.com/api/v1/nlp/${id}`, {
          headers: { Authorization: token || '' }
        })

        if (!response.ok) throw new Error("Failed to fetch data")
        
        const data: NLPResponse = await response.json()
        setFields(data.data.fields)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load form data")
      }
    }

    fetchNlpData()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6">Form Details</h2>
    
    {error && (
      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
        {error}
      </div>
    )}

    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="border rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <div className="text-lg">
            {field.value}
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}