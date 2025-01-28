"use client"

import { useEffect, useState } from 'react'
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Download, ExternalLink } from "lucide-react"
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface Link {
  label: string
  value: string
  url: string
}

interface Field {
  label: string
  value: string
  url?: string
  links?: Link[]
}

interface NLPResponse {
  message: string
  data: {
    fields: Field[]
  }
}

export default function Form() {
  const { id } = useParams()
  const [fields, setFields] = useState<Field[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNlpData = async () => {
      try {
        const token = sessionStorage.getItem("authToken")
        const response = await fetch(`https://formai-mwwx.onrender.com/api/v1/nlp/${id}`, {
          headers: { Authorization: token || '' }
        })
        
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        
        const data: NLPResponse = await response.json()
        setFields(data.data.fields)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load form data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNlpData()
  }, [id])

  const handleInputChange = (index: number, newValue: string) => {
    const updatedFields = [...fields]
    updatedFields[index] = { ...updatedFields[index], value: newValue }
    setFields(updatedFields)
  }

  const handleDownload = () => {
    const dataToDownload = { fields }
    const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `form-data-${id}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const renderField = (field: Field, index: number) => {
    return (
      <div key={index} className="grid w-full items-center gap-2 px-3">
        <Label className='font-semibold' htmlFor={`field-${index}`}>{field.label}</Label>
        <Input 
          id={`field-${index}`}
          value={field.value}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
        
        {/* Render single URL if present */}
        {field.url && (
          <div className="flex items-center gap-2 mt-1">
            <ExternalLink className="h-4 w-4 text-gray-500" />
            <Link 
              href={field.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {field.url}
            </Link>
          </div>
        )}
        
        {/* Render multiple links if present */}
        {field.links && field.links.length > 0 && (
          <div className="flex flex-col gap-1 mt-1">
            {field.links.map((link, linkIndex) => (
              <div key={linkIndex} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-gray-500" />
                <Link 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {link.label}: {link.value}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full px-8 py-3 flex flex-col justify-center items-center'>
      <Card className="w-full max-w-3xl mx-auto px-6 py-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              Form Details
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
            <Button
              onClick={handleDownload}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Download JSON
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <Skeleton className="h-4 w-[200px] mb-2" />
                      <Skeleton className="h-6 w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                fields.map((field, index) => renderField(field, index))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}