import { useRouteError } from "@remix-run/react"

function useCapturedRouteError() {
  const error = useRouteError()
  return error
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message
  return 'Unknown Error'
}

export {
  getErrorMessage,
  useCapturedRouteError
}