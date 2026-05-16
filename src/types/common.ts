// RFC 7807 Problem Details. The backend returns this shape on errors;
// `title`/`detail` are surfaced in the UI (brief sec. 7).
export interface ProblemDetails {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
}

// Backend pagination envelope. totalPages is derived client-side as
// ceil(totalCount / pageSize) (brief sec. 7.1).
export interface PaginatedResult<T> {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
}
