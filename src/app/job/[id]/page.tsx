"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import parse from 'html-react-parser';
import he from 'he';
import { useSearchParams } from "next/navigation";
import api from "@/services/api"
import Image from "next/image"
import type { Job } from "@/types/"
import getLogo from "@/lib/getLogo"
import { DEFAULT_COMPANY } from "@/constants";
import {HTTP_STATUS} from "@/constants";
import JobTitleLocation from "@/components/shared/JobDetailsPage";
import { Spin } from 'antd'; // Import Spin from Ant Design

export default function JobDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const company = useSearchParams().get("company") || DEFAULT_COMPANY; // Default to "figma" if no company is provided
  const [logo, setLogo] = useState<string | null>(null)
  const parsedContent = useMemo(() => {
    return job ? parse(he.decode(job.content)) : null;
  }, [job]);

  useEffect(() => {
    const jobId = params?.id;
    if (!jobId) {
      setError("Invalid job ID")
      setLoading(false)
      return
    }

    const fetchJob = async () => {
      try {
        const res = await api.get(`/${company}/jobs/${jobId}?content=true`)
        const logoUrl = await getLogo(company)
        setLogo(logoUrl)
        if (res.status !== HTTP_STATUS.OK) throw new Error("Job not found")
        const data = res.data;
        setJob(data)
      } catch (err: unknown) {
        setError((err as Error).message || "Failed to fetch job")
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [params.id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 flex justify-center items-center h-64">
        <Spin size="large" /> {/* Ant Design Spin loader */}
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
      <div className="bg-card dark:bg-card-dark rounded-lg shadow-md mb-8 p-6 flex flex-row md:items-center gap-6">
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-md">
          <Image
            src={logo || "/default-logo.png"}
            alt={`${company} logo`}
            width={70}
            height={70}
            className="rounded object-contain h-full"
          />
        </div>
        <div className="flex-1">
          <JobTitleLocation title={job.title} location={job.location.name} className="text-2xl font-bold text-bg-dark dark:text-bg mb-1" />
          <p className="text-xs text-gray-400">Updated at: {new Date(job.updated_at).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Job Content Section */}
      <div className="bg-card dark:bg-card-dark text-bg-dark dark:text-bg rounded-lg shadow-md p-6">
        {/* Optional subheader inside card */}
        <div className="bg-[#001529aa] rounded-xl px-4 py-3 mb-6">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-400">{job.location.name}</p>
        </div>

        {/* Parsed Job Description */}
        <div className="job-description prose prose-invert max-w-none">
          {parsedContent}
        </div>

        {/* Footer Apply CTA */}
        <div className="mt-10 pt-6 border-t border-gray-600 text-center">
          <h4 className="text-lg font-semibold mb-3 text-blue-400">Ready to take the next step?</h4>
          <Link
            href={job.absolute_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-base transition"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  )
}
