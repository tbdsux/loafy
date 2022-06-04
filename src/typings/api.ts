interface ApiResponse<T = null> {
  success: boolean;
  message?: string;
  data?: T;
}

export type { ApiResponse };
