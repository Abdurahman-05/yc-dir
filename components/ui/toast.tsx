"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"


export type ToastActionElement = React.ReactNode

export type ToastProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "success" | "destructive"
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  React.useEffect(() => {
    if (!toasts?.length) return

    // Auto dismiss after 3s
    const timers = toasts.map((t) =>
      setTimeout(() => dismiss(t.id), 3000)
    )

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [toasts, dismiss])

  if (!toasts?.length) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => {
        const isError = t.variant === "destructive"

        return (
          <div
            key={t.id}
            className={[
              "rounded-md shadow-lg px-4 py-3 w-80 text-sm text-white transition-opacity duration-300",
              isError ? "bg-red-500" : "bg-green-500",
            ].join(" ")}
            role="status"
          >
            {t.title && (
              <div className="font-semibold mb-1">
                {t.title}
              </div>
            )}
            {t.description && <div>{t.description}</div>}
          </div>
        )
      })}
    </div>
  )
}

export default Toaster
