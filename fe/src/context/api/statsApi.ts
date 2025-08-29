
import api from "./axios";

export const statsApi = {
  // Dashboard statistics
  getStats: async () => {
    const res = await api.get("/stats"); // sesuai backend
    return res.data;
  },
};
