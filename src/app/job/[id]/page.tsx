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
import { Spin } from 'antd';
import { MapPin, Calendar, ExternalLink, Building } from "lucide-react";

export default function JobDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const company = useSearchParams().get("company") || DEFAULT_COMPANY;
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
  }, [params.id, company])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">{error || "Job not found"}</h1>
        <p className="mb-6">Please check the job ID and try again.</p>
        <Link href="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Back to Jobs
        </Link>
      </div>
    )
  }

  // Generate fallback logo if image fails
  const renderCompanyLogo = () => {
    if (logo) {
      return (
        <Image
          src={logo}
          alt={`${company} logo`}
          width={80}
          height={80}
          className="rounded object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23f3f4f6" rx="8"/><text x="50%" y="50%" font-family="Arial" font-size="32" fill="%234b5563" text-anchor="middle" dy=".3em">${company.charAt(0).toUpperCase()}</text></svg>`;
          }}
        />
      );
    }
    
    // Fallback to generated logo
    return (
      <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
          {company.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Job Header Card */}
      <div className="bg-card dark:bg-card-dark rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200 dark:border-gray-700">
        {/* Company Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md">
            {renderCompanyLogo()}
          </div>
          <div className="flex-1 text-center md:text-left text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-4 text-white/90">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Building className="w-4 h-4" />
                <span className="font-medium">{company.charAt(0).toUpperCase() + company.slice(1)}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location.name}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4" />
                <span>Updated {new Date(job.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href={job.absolute_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Apply Now
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Job Overview Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Job Type</h3>
              <p className="font-medium dark:text-gray-200">Full Time</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Experience</h3>
              <p className="font-medium dark:text-gray-200">Mid Level</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Department</h3>
              <p className="font-medium dark:text-gray-200">Engineering</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Description Section */}
      <div className="bg-card dark:bg-card-dark rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
            Job Description
          </h2>
          
          {/* Parsed Job Content */}
          <div className="job-description text-gray-800 dark:text-gray-200">
            {parsedContent ? (
              parsedContent
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No detailed description available for this position.
              </p>
            )}
          </div>
        </div>

        {/* Apply Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Ready to take the next step?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join our team and make an impact in a dynamic environment
            </p>
            <Link
              href={job.absolute_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Apply for this position
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Jobs Button */}
      <div className="mt-8 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg transition-colors"
        >
          ← Back to all jobs
        </Link>
      </div>
    </div>
  )
}