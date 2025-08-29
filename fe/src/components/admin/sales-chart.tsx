// "use client";
// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardBody } from "@heroui/card";
// import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
// import { io } from "socket.io-client";

// export default function SalesChart() {
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     const socket = io("http://localhost:5000");

//     socket.on("sales:update", (salesData) => {
//       console.log("Realtime sales:", salesData);
//       setData(salesData);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <Card shadow="sm" className="p-4">
//       <CardHeader>
//         <h3 className="text-lg font-semibold">Trend Penjualan Bulanan</h3>
//       </CardHeader>
//       <CardBody>
//         <ResponsiveContainer width="100%" height={300}>
//           <AreaChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip formatter={(value) => `Rp ${(value as number).toLocaleString("id-ID")}`} />
//             <Area type="monotone" dataKey="penjualan" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
//           </AreaChart>
//         </ResponsiveContainer>
//       </CardBody>
//     </Card>
//   );
// }
