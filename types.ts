// Auth request and response types
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

// News verification request and response types
export interface VerifyRequest {
  input: string;
}

export interface VerifyResponse {
  score: number;
  text: string;
}

// Contact form request and response types
export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  companySize?: string;
  topic?: string;
  message?: string;
}

export interface ContactResponse {
  message: string;
}
