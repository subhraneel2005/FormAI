'use client'

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import { ArrowRight, Upload, Sparkles, Database } from "lucide-react"

const steps = [
  {
    title: "Upload PDF",
    description: "Simply drag and drop or click to upload your PDF document to our secure platform.",
    icon: Upload,
    color: "bg-blue-500"
  },
  {
    title: "AI Processing",
    description: "Our advanced AI analyzes the document structure and content in real-time.",
    icon: Sparkles,
    color: "bg-purple-500"
  },
  {
    title: "Get Results",
    description: "Receive your structured data in JSON format, ready for integration.",
    icon: Database,
    color: "bg-green-500"
  }
]

export default function Workflow() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -200px 0px"
  })

  return (
    <div className="min-h-screen gradient-section w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-12 md:py-16 mt-[55px]">
      {/* Heading and Bio */}
      <div className="w-full max-w-4xl mb-8 md:mb-12">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 lg:text-center">Workflow</h2>
        <p className="text-base sm:text-lg text-foreground max-w-2xl mx-auto px-4 text-start">
          Transform your PDF documents into structured data in three simple steps. 
          Our intuitive workflow makes document processing effortless and efficient.
        </p>
      </div>

      {/* Video Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mb-8 md:mb-16 rounded-xl overflow-hidden shadow-2xl mx-4"
      >
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe 
            src="https://www.loom.com/embed/8883609e648e47158b61e5ce44612409?sid=bf07bad8-ee17-43ff-88aa-319c83a68fbf" 
            frameBorder="0"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            allowFullScreen
          />
        </div>
      </motion.div>

      {/* Steps Section */}
      <div ref={ref} className="w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <Card className="h-full">
                <CardContent className="p-4 sm:p-6">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className={`p-3 sm:p-4 rounded-full ${step.color} mb-3 sm:mb-4`}>
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{step.description}</p>
                  </motion.div>
                </CardContent>
              </Card>
              
              {/* Arrow connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <motion.div
                    animate={{ x: [0, 15, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}