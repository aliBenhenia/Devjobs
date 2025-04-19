"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

// Job type definition
interface JobRequirements {
  content: string
  items: string[]
}

interface JobRole {
  content: string
  items: string[]
}

interface Job {
  id: number
  company: string
  logo: string
  logoBackground: string
  position: string
  postedAt: string
  contract: string
  location: string
  website: string
  apply: string
  description: string
  requirements: JobRequirements
  role: JobRole
}

// Import the jobs data
import jobsData from "@/data/data.json"
import Button from "@/components/ui/Button"
export default function JobDetailsPage() {
  const params = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const jobId = Number(params.id)

    if (!jobId) {
      setError("Invalid job ID")
      setLoading(false)
      return
    }

    console.log("Job ID:", jobId)

    const foundJob = jobsData.find((job) => job.id === jobId)

    if (foundJob) {
      setJob(foundJob)
    } else {
      setError("Job not found")
    }

    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">{error || "Job not found"}</h1>
          <p className="mb-6">Please check the job ID and try again.</p>
          <Link href="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Back to Jobs
          </Link>
        </div>
      </div>
    )
  }


  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Company Info */}
      <div className="bg-card dark:bg-card-dark rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div
            className="w-full md:w-24 h-24 flex items-center justify-center p-4"
            style={{ backgroundColor: job.logoBackground }}
          >
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center">
              <Image
                src={job.logo || "/placeholder.svg?height=40&width=40"}
                alt={`${job.company} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div>
              <h1 className="text-xl font-bold text-bg-dark dark:text-bg ">{job.company}</h1>
              <p className="text-gray-500">{job.website.replace("https://example.com/", "")}</p>
            </div>
            <Link
              href={job.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 px-6 py-2 bg-gray-100 text-blue-600 hover:bg-gray-200 rounded-md transition-colors"
            >
              Company Site              
            </Link>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-card dark:bg-card-dark text-bg dark:text-bg-dark  rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <span>{job.postedAt}</span>
              <span>•</span>
              <span>{job.contract}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 dark:text-bg text-bg-dark">{job.position}</h2>
            <p className="text-sm font-semibold text-blue-600">{job.location}</p>
          </div>
          <Link
            href={job.apply}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors w-full md:w-auto text-center"
          >
            Apply Now
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 dark:text-bg text-bg-dark">Requirements</h3>
            <p className="text-gray-600 mb-4">{job.requirements.content}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {job.requirements.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 dark:text-bg text-bg-dark">What You Will Do</h3>
            <p className="text-gray-600 mb-4">{job.role.content}</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              {job.role.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Footer Apply Section */}
      <div className="bg-card dark:bg-card-dark dark:text-bg text-bg-dark  rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="hidden md:block">
            <h3 className="text-xl font-bold">{job.position}</h3>
            <p className="text-gray-500">{job.company}</p>
          </div>
          <Link
            href={job.apply}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors w-full md:w-auto text-center"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  )
}
