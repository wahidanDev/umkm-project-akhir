import api from "./axios";

export const productApi = {
  // GET all products
  getAll: async () => {
    const res = await api.get("/products");
    return res.data;
  },

  // GET single product by ID
  getById: async (id: string) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  // GET top products
  getTop: async () => {
    const res = await api.get("/products/top");
    return res.data;
  },

  // CREATE new product (admin only, with image)
  create: async (data: FormData) => {
    const res = await api.post("/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // UPDATE product
  update: async (id: string, data: FormData | Record<string, any>) => {
    const res = await api.put(`/products/${id}`, data, {
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return res.data;
  },

  // DELETE product
  delete: async (id: string) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
