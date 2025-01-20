const API_BASE_URL = 'http://localhost:5000';

export interface LoginData {
  user_email: string;
  user_password: string;
}

export interface SignupData {
  user_name: string;
  user_email: string;
  user_password: string;
  user_contact_no: string;
  is_admin: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export interface Product {
  prod_id: number;
  prod_name: string;
  prod_image: string;
  prod_price: number;
  rating_stars: number;
  rating_count: number;
  prod_keywords: string[];
}

const handleResponse = async (response: Response) => {
  try {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response");
    }
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (error) {
    console.error('Response handling error:', error);
    throw new Error('Failed to process server response');
  }
};

export const api = {
  login: async (data: LoginData) => {
    try {
      console.log('Sending login request with data:', data);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      console.log('Login response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }
      
      return responseData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  signup: async (data: SignupData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error((await response.json()).message);
    }

    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  getUserInfo: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/user-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }

    return response.json();
  },

  // Add to cart
  addToCart: async (prod_id: number, user_id: number) => {
    console.log('Adding to cart:', { prod_id, user_id });
    const response = await fetch(`${API_BASE_URL}/cart/add`, { // Updated URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prod_id, user_id }),
    });
    
    return handleResponse(response);
  },

  // Get cart items
  getCartItems: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/items/${userId}`);
    return handleResponse(response);
  },

  // Remove from cart
  removeFromCart: async (cartId: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${cartId}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  getCurrentUserId: async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/current-user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    const data = await handleResponse(response);
    return data.userId;
  },

  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products/allProducts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return handleResponse(response);
  },
};
