'use client'

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Wand2, LayoutGrid, Zap, FileJson, CheckCircle } from "lucide-react"
import { useRef } from "react"

const features = [
  {
    title: "PDF Upload",
    description: "Easily upload any PDF document to our secure platform.",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    title: "AI-Powered Analysis",
    description: "Advanced AI and NLP algorithms process your document.",
    icon: Wand2,
    color: "bg-purple-500",
  },
  {
    title: "Form Generation",
    description: "Automatically generate structured forms from your PDF content.",
    icon: LayoutGrid,
    color: "bg-green-500",
  },
  {
    title: "Quick Processing",
    description: "Lightning-fast conversion from PDF to actionable forms.",
    icon: Zap,
    color: "bg-yellow-500",
  },
  {
    title: "JSON Output",
    description: "Receive your form data in clean, structured JSON format.",
    icon: FileJson,
    color: "bg-red-500",
  },
  {
    title: "Accuracy Guarantee",
    description: "High-precision extraction with built-in validation.",
    icon: CheckCircle,
    color: "bg-teal-500",
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -200px 0px" // Starts animation slightly before coming into full view
  })
  return (
    <div className="min-h-screen gradient-section w-full flex flex-col justify-center items-center p-8 py-10">
      {/* Heading and Bio */}
      <div className="items-start mb-8">
        <h2 className="text-5xl lg:text-7xl font-bold mb-4 md:text-center">Features</h2>
        <p className="text-lg text-foreground max-w-xl">
          Our platform uses AI and NLP to transform unstructured PDFs into actionable and structured JSON forms, making your workflow seamless and efficient.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div ref={ref} className="md:grid md:grid-cols-2 md:gap-6 flex flex-col justify-center items-center md:space-y-0 space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
  color,
}: {
  title: string
  description: string
  icon: React.ElementType
  color: string
}) {
  return (
    <Card className="overflow-hidden w-[350px] h-[200px]">
      <CardContent className="p-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center text-center"
        >
          <div className={`p-3 rounded-full ${color} mb-4`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-start">{description}</p>
        </motion.div>
      </CardContent>
    </Card>
  )
}