"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import Button from "@/components/ui/Button"
import parse from 'html-react-parser';
import he from 'he';

interface Job {
  id: number
  title: string
  location: {
    name: string
  }
  updated_at: string
  absolute_url: string
  content: string // HTML content
}

export default function JobDetailsPage() {
  const params = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const jobId = params?.id

    if (!jobId) {
      setError("Invalid job ID")
      setLoading(false)
      return
    }

    const fetchJob = async () => {
      try {
        const res = await fetch(`https://boards-api.greenhouse.io/v1/boards/figma/jobs/${jobId}?content=true`)
        if (!res.ok) throw new Error("Job not found")

        const data = await res.json()
        setJob(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch job")
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [params.id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">{error || "Job not found"}</h1>
        <p className="mb-6">Please check the job ID and try again.</p>
        <Link href="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Back to Jobs
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Job Header */}
      <div className="bg-card dark:bg-card-dark rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-bg-dark dark:text-bg">{job.title}</h2>
            <p className="text-sm text-gray-500 mb-1">{job.location.name}</p>
            <p className="text-xs text-gray-400">Updated at: {new Date(job.updated_at).toLocaleDateString()}</p>
          </div>
          <Link
            href={job.absolute_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors w-full md:w-auto text-center"
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* Job Content */}
      {/* <div
        className="bg-card dark:bg-card-dark text-bg-dark dark:text-bg rounded-lg shadow-md p-6"
        dangerouslySetInnerHTML={{ __html: job.content }}
      /> */}
      <div className="bg-card dark:bg-card-dark text-bg-dark dark:text-bg rounded-lg shadow-md p-6">
        {parse(he.decode(job.content))}
      </div>
    </div>
  )
}
