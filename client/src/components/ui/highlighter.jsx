import { useEffect, useRef } from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"

export function Highlighter({
  children,
  action = "underline",
  color = "#e1b382",
  strokeWidth = 2,
  animationDuration = 2000,
  iterations = 3,
  padding = 1,
  multiline = true,
  isView = false,   // if false => always visible
  delay = 10000       // ms to wait before re-triggering when it comes into view
}) {
  const elementRef = useRef(null)
  const annotationRef = useRef(null)
  const timerRef = useRef(null)
  const prevInViewRef = useRef(false)
  const resizeTimerRef = useRef(null)

  const isInView = useInView(elementRef, {
    once: false,
    margin: "-10%"
  })

  // Create the annotation once
  useEffect(() => {
    const el = elementRef.current
    if (!el || annotationRef.current) return

    annotationRef.current = annotate(el, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    })

    // If not gated by view, show immediately
    if (!isView) {
      annotationRef.current.show()
    }

    // Debounced refresh on resize
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimerRef.current)
      resizeTimerRef.current = setTimeout(() => {
        if (!annotationRef.current) return
        annotationRef.current.hide()
        annotationRef.current.show()
      }, 100)
    })
    ro.observe(document.body)
    if (el) ro.observe(el)

    return () => {
      clearTimeout(timerRef.current)
      clearTimeout(resizeTimerRef.current)
      ro.disconnect()
      if (annotationRef.current) {
        annotationRef.current.remove()
        annotationRef.current = null
      }
    }
  }, [action, color, strokeWidth, animationDuration, iterations, padding, multiline, isView])

  // Edge-triggered retrigger with delay
  useEffect(() => {
    if (!isView) return // not gated by view; nothing to do
    const justEntered = !prevInViewRef.current && isInView
    prevInViewRef.current = isInView

    if (!justEntered) return
    if (!annotationRef.current) return

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      // Retrigger animation: hide → show
      annotationRef.current.hide()
      annotationRef.current.show()
    }, delay)
  }, [isInView, isView, delay])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
