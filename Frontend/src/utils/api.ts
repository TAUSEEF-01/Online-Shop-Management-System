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
  prod_quantity: number;
  prod_discount: number;
  prod_id: number;
  prod_name: string;
  prod_image: string;
  prod_price: number;
  rating_stars: number;
  rating_count: number;
  prod_keywords: string[];
}

export interface BillProduct {
  prod_id: number;
  prod_qty: number;
  prod_price: number;
  prod_total_price: number;
}

export interface BillData {
  user_id: number;
  order_id: number;
  user_name: string;
  products: BillProduct[];
  order_total_price: number;
  bill_total_price: number;
  pay_status: string;
}

// export interface OrderDetail {
//   order_id: number;
//   prod_id: number;
//   prod_qty: number;
//   prod_price: number;
//   prod_total_price: number;
// }

export interface UpdateProductData {
  prod_id: number;
  prod_name: string;
  prod_image: string;
  prod_quantity: number;
  prod_price: number;
  rating_stars: number;
  rating_count: number;
  prod_discount: number;
  prod_keywords: string[];
}

export interface OrderItemDetail {
  prod_id: number;
  prod_qty: number;
  prod_price: number;
  prod_total_price: number;
}

export interface OrderData {
  user_id: number;
  // order_date: string;
  user_address: string;
  total_amt: number;
  order_status: string;
  // order_details: OrderDetail[];
  order_details: OrderItemDetail[];
}

export interface QueryResult {
  success: boolean;
  data: any[];
  rowCount?: number;
  error?: string;
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

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const defaultOptions = {
  credentials: 'include' as RequestCredentials,
  headers: defaultHeaders,
};

const api = {
  login: async (data: LoginData) => {
    try {
      console.log('Sending login request with data:', data);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        ...defaultOptions,
        method: 'POST',
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
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error((await response.json()).message);
    }

    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      ...defaultOptions,
      method: 'POST',
    });
    return response.json();
  },

  getUserInfo: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/user-info`, {
      ...defaultOptions,
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }

    return response.json();
  },

  // Add to cart
  addToCart: async (prod_id: number, user_id: number) => {
    console.log('Adding to cart:', { prod_id, user_id });
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify({ prod_id, user_id }),
    });
    
    return handleResponse(response);
  },

  // Add to cart with cart_id
  addToCartWithCartId: async (cartId: number, prod_id: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/addToCart/${cartId}`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify({ prod_id }),
    });
    return handleResponse(response);
  },

  // Get cart items
  getCartItems: async (userId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/items/${userId}`, {
        ...defaultOptions,
        method: 'GET',
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      throw new Error('Network error while fetching cart items');
    }
  },

  // Remove from cart
  removeFromCart: async (cartId: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${cartId}`, {
      ...defaultOptions,
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  clearCart: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/clear/${userId}`, {
      ...defaultOptions,
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  getCurrentUserId: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/current-user`, {
      ...defaultOptions,
      method: 'GET',
    });
    
    const data = await handleResponse(response);
    return data.userId;
  },

  getCurrentUserName: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/auth/current-user-name/${userId}`, {
      ...defaultOptions,
      method: 'GET',
    });
    
    const data = await handleResponse(response);
    return data.user_name;
  },

  getCartIdByUserId: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
      ...defaultOptions,
      method: 'GET',
    });
    return handleResponse(response);
  },

  // checkAuth: async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/auth/status`, {
  //       ...defaultOptions,
  //       method: 'GET',
  //     });
      
  //     if (!response.ok) {
  //       throw new Error('Authentication check failed');
  //     }
      
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Auth check error:', error);
  //     return { authenticated: false };
  //   }
  // },

  checkAuth: async () => {
    try {

      console.log('Checking authentication status', defaultOptions);

      const response = await fetch(`${API_BASE_URL}/auth/status`, {
        ...defaultOptions,
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Authentication check failed');
      }

      const data = await response.json();
      console.log('Auth check response:', data);
      return data.isAuthenticated; // Ensure it matches the backend response
    } catch (error) {
      console.error('Auth check error:', error);
      return false; // Default to false if an error occurs
    }
  },


  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products/allProducts`, {
      ...defaultOptions,
      method: 'GET',
    });
    return handleResponse(response);
  },

  createBill: async (data: BillData) => {
    const response = await fetch(`${API_BASE_URL}/billing/create`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getBillDetails: async () => {
    const response = await fetch(`${API_BASE_URL}/billing/details`, {
      ...defaultOptions,
      method: 'GET',
    });
    return handleResponse(response);
  },

  getBillDetailsByOrderId: async (orderId: number) => {
    const response = await fetch(`${API_BASE_URL}/billing/details/${orderId}`, {
      ...defaultOptions,
      method: 'GET',
    });
    return handleResponse(response);
  },

  createOrder: async (data: OrderData) => {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  createBillDetails: async (data: BillData) => {
    const response = await fetch(`${API_BASE_URL}/billing/create`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // createOrderDetails: async (data: OrderDetail) => {
  //   const response = await fetch(`${API_BASE_URL}/orders/create`, {
  //     ...defaultOptions,
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   });
  //   return handleResponse(response);
  // },

  updatePaymentStatus: async (billId: number, newStatus: string) => {
    const response = await fetch(`${API_BASE_URL}/billing/updatePaymentStatus`, {
      ...defaultOptions,
      method: 'PUT',
      body: JSON.stringify({ billId, newStatus }),
    });
    return handleResponse(response);
  },

  getBillingsByUserId: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/billing/user/${userId}`, {
      ...defaultOptions,
      method: 'GET',
    });
    return handleResponse(response);
  },

  updateProfile: async (data: { user_name: string; user_email: string; user_password: string; user_contact_no: string; }) => {
    const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
      ...defaultOptions,
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error((await response.json()).message);
    }

    return response.json();
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      ...defaultOptions,
      method: 'GET',
    });
    return handleResponse(response);
  },

  updateAdminStatus: async (userId: number, isAdmin: boolean) => {
    const response = await fetch(`${API_BASE_URL}/auth/update-admin-status`, {
      ...defaultOptions,
      method: 'PUT',
      body: JSON.stringify({ userId, isAdmin }),
    });
    return handleResponse(response);
  },
  
  updateProductInfo: async (data: UpdateProductData) => {
    const response = await fetch(`${API_BASE_URL}/products/update-product-info/${data.prod_id}`, {
      ...defaultOptions,
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error((await response.json()).message);
    }

    return response.json();
  },

  getProductInfo: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}/products/get-product-info/${endpoint}`, {
      ...defaultOptions,
      method: 'GET',
    });
    return handleResponse(response);
  },

  deleteProduct: async (productId: number) => {
    const response = await fetch(`${API_BASE_URL}/products/delete/${productId}`, {
      ...defaultOptions,
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}/products${endpoint}`, {
      ...defaultOptions,
      method: 'GET',
    });
    return handleResponse(response);
  },


  getPaymentDoneInfo: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}/billing${endpoint}`, {
      ...defaultOptions,
      method: 'GET',
    });
    return handleResponse(response);
  },

  executeRawQuery: async (query: string): Promise<QueryResult> => {
    const response = await fetch(`${API_BASE_URL}/execute-query`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    return handleResponse(response);
  }
};

export { api };
