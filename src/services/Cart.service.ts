import axios, { AxiosResponse } from "axios";
//https://elenaspen.com:3001
// Store the session ID in sessionStorage
export const setSessionId = (sessionId: string) => {
  sessionStorage.setItem("sessionId", sessionId);
};

// Retrieve the session ID from sessionStorage
export const getSessionId = () => {
  return sessionStorage.getItem("sessionId");
};

export class CartService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "https://elenaspen.com:3001/cart";
  }

  async getCart(): Promise<any> {
    const sessionId = getSessionId();
    try {
      const response: AxiosResponse = await axios.get(this.baseUrl, {
        headers: { Authorization: sessionId },
      });
    

      if (response.status === 204) {
        return [];
      } else {
        return response.data.cart_items;
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }
  async postCart(items: any[]): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(this.baseUrl, { items });
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }
}
export const addItemsToCart = async (items: any[]): Promise<any> => {
  const sessionId = getSessionId();
  try {
    const response: AxiosResponse = await axios.post(
      "https://elenaspen.com:3001/cart",
      { items },
      {
        headers: { Authorization: sessionId },
      }
    );

    return response.data;
  } catch (error) {
  
    throw error;
  }
};
