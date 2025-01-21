"use client"

import { useEffect, useState } from 'react'
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"

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

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Form Details
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </CardTitle>
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
              // Loading skeletons
              Array.from({ length: 5 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-4 w-[200px] mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : (
              // Actual fields
              fields.map((field, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      {field.label}
                    </label>
                    <div className="text-lg">
                      {field.value || <span className="text-muted-foreground italic">No value provided</span>}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
    </div>
  )
}