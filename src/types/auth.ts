export interface UserDto {
  id: string
  email: string
  createdAt: string
}

// Mirrors the backend AuthResponse exactly (brief sec. 7.1). Every
// /api/auth/* success returns this; refresh rotates `refreshToken`.
export interface AuthResponse {
  accessToken: string
  accessTokenExpiresAt: string
  refreshToken: string
  user: UserDto
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}
