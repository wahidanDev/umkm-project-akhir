import api from "./axios";

export const orderApi = {
  checkout: async (items: any[], total: number) => {
    const res = await api.post("/orders/checkout", { items, total });
    return res.data;
  },

  getMyOrders: async () => {
    const res = await api.get("/orders/my");
    return res.data;
  },
};
