import axios, { AxiosResponse } from "axios";

export class ProductService {
  private readonly baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3001/api/products";
  }

  async getProducts(): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(this.baseUrl);

      if (response.status === 204) {
        return [];
      } else {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }
}
