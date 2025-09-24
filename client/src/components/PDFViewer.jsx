import React from 'react'
const RESUME_URL = "/assets/resume.pdf"; // put your actual path here
import expand_icon from '/assets/expand.svg'
import { FaExpand } from "react-icons/fa";

const PDFViewer = () => {
  return (
    <div>
      {/* PDF viewer with overlayed Expand button */}
      <div className="relative h-[75vh] w-full bg-slate-50 dark:bg-slate-900">
        {/* The PDF */}
        <object
          data={RESUME_URL}
          type="application/pdf"
          className="h-full w-full"
        >
          {/* Fallback if <object> fails */}
          <iframe
            title="Resume PDF"
            src={RESUME_URL}
            className="h-full w-full"
          />
        </object>

        {/* Overlayed expand button */}
        <div className="absolute top-2.5 right-3 z-10">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume in a new tab"
            className="inline-flex items-center justify-center h-9 w-9 rounded-full
                     bg-[#3c3c3c]
                       hover:bg-stone-600
                       "
            title="Open in new tab"
          >
  <FaExpand className="h-4 w-4 text-stone-200 " />
          </a>
        </div>
      </div>

      {/* Fallback actions (for browsers that block inline PDFs) */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-800">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          If the PDF doesn’t load, use the expand button or{" "}
          <a
            className="underline underline-offset-4"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            open in a new tab
          </a>.
        </span>
      </div>
    </div>
  )
}

export default PDFViewer
