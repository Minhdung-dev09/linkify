/**
 * Get authentication token from various sources
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    // Try localStorage with different key names
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
    if (token) return token;
    
    // Try cookies
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    
    if (cookieToken) return cookieToken;
  }
  
  return null;
}

// Alias for backward compatibility
export const getToken = getAuthToken;

/**
 * Get headers with authentication
 */
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

/**
 * Set authentication token
 */
export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('auth_token', token);
    // Set cookie
    document.cookie = `token=${token}; path=/; max-age=86400`; // 24 hours
  }
}

/**
 * Clear authentication token
 */
export function clearToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    // Clear cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}

/**
 * Get user from localStorage
 */
export function getUser(): any | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('auth_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
  }
  return null;
}