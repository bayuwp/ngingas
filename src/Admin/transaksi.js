import React, { useEffect, useState } from "react";

const TransaksiAdmin = () => {
  const [transactions, setTransactions] = useState([]);

  // Fungsi untuk mengambil data transaksi dari backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/transactions");
        if (!response.ok) {
          throw new Error("Gagal mengambil data transaksi");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Daftar Transaksi
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              ID Transaksi
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Nama Pelanggan
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Total Barang
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Total Harga
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Metode Pembayaran
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Status Transaksi
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Status Pengiriman
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Catatan
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((trx) => (
              <tr key={trx.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {trx.transactionId}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {trx.customerName}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {trx.totalItems}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Rp {trx.totalPrice.toLocaleString("id-ID")}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {trx.paymentMethod}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {trx.transactionStatus}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {trx.shippingStatus || "-"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {trx.notes || "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                style={{ textAlign: "center", padding: "10px" }}
              >
                Tidak ada data transaksi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransaksiAdmin;