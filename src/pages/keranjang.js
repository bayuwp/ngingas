import React, { useEffect, useState } from "react";
import axios from "axios";

const Keranjang = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [citiesOrigin, setCitiesOrigin] = useState([]);
  const [citiesDestination, setCitiesDestination] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  useMidtransClient("SB-Mid-client-GL6oCvkjMi9-Iy5t");
  const [form, setForm] = useState({
    originProvince: "",
    originCity: "",
    destinationProvince: "",
    destinationCity: "",
    weight: 0,
    courier: "",
    addressDetail: "",
  });
  const [shippingCost, setShippingCost] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setShippingCost(0);
    setForm({
      originProvince: "",
      originCity: "",
      destinationProvince: "",
      destinationCity: "",
      weight: 0,
      courier: "",
      addressDetail: "",
    });
    setCitiesOrigin([]);
    setCitiesDestination([]);
    setShippingOptions([]);
    setSelectedService("");
  };

  const handleBayar = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/midtrans/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: "ORDER-" + new Date().getTime(),
          gross_amount: calculateTotal() + shippingCost,
        }),
      });
      const data = await response.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: () => {
            alert("Pembayaran berhasil");
            closeModal();
          },
          onError: () => alert("Pembayaran gagal"),
          onClose: () => alert("Dibatalkan"),
        });
      } else alert("Gagal mendapatkan token Midtrans");
    } catch (err) {
      alert("Error saat checkout: " + err.message);
    }
  };

  function useMidtransClient(clientKey) {
    useEffect(() => {
      const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

      if (!document.getElementById("midtrans-script")) {
        const script = document.createElement("script");
        script.id = "midtrans-script";
        script.src = midtransScriptUrl;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;
        document.body.appendChild(script);
      }
    }, [clientKey]);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/keranjang");
        if (!response.ok) throw new Error("Gagal mengambil data keranjang");
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/province")
      .then((res) => {
        if (res.data.rajaongkir?.results) {
          setProvinsi(res.data.rajaongkir.results);
        }
      })
      .catch((err) => console.error("Gagal mengambil data provinsi:", err));
  }, []);

  const handleProvinceChange = (type, provinceId) => {
    if (!provinceId || provinceId === "undefined") return;
    setForm((prev) => ({
      ...prev,
      ...(type === "origin"
        ? { originProvince: provinceId, originCity: "" }
        : { destinationProvince: provinceId, destinationCity: "" }),
    }));
    fetchCitiesByProvince(provinceId, type);
  };

  useEffect(() => {
    fetch(`http://localhost:5001/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          addressDetail: data.alamat || "",
        }));
      })
      .catch((err) => {
        console.error("Gagal mengambil data profil:", err);
      });
  }, []);

  const fetchCitiesByProvince = async (provinceId, type) => {
    if (!provinceId || provinceId === "undefined") return;

    try {
      const response = await axios.get(
        `http://localhost:5001/api/city?province=${provinceId}`
      );
      const cities = response.data.rajaongkir?.results || [];

      if (type === "origin") setCitiesOrigin(cities);
      else if (type === "destination") setCitiesDestination(cities);
    } catch (err) {
      console.error("Gagal mengambil data kota:", err);
    }
  };

  // Fungsi hitung total berat
  const calculateWeight = () => {
    const beratPerItem = Number(form.weight) || 0;
    const selected = cart.filter((item) => selectedItems.includes(item.id));
    const totalWeight = selected.reduce((sum, item) => sum + item.qty * beratPerItem, 0);
    return totalWeight;
  };

  const calculateShipping = async () => {
    if (
      !form.originCity ||
      !form.destinationCity ||
      !form.weight ||
      !form.courier
    ) {
      alert("Harap lengkapi semua data pengiriman");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/cost", {
        origin: form.originCity,
        destination: form.destinationCity,
        weight: parseInt(form.weight),
        courier: form.courier,
      });

      const options = response.data.rajaongkir.results[0].costs;
      setShippingOptions(options);
    } catch (error) {
      alert("Gagal menghitung ongkir");
    }
  };

  const calculateTotal = () => {
    return cart
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.subtotal, 0);
  };

  const handleSelectService = (service, cost) => {
    setSelectedService(service);
    setShippingCost(cost);
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };
  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  };
  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  };
  const trStyle = {
    backgroundColor: "#fff",
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "28px",
          color: "#333",
        }}
      >
        Keranjang Belanja
      </h1>

      <div style={{ overflowX: "auto", marginBottom: "20px" }}>
        <table style={tableStyle}>
          <thead style={{ backgroundColor: "#0d6efd", color: "white" }}>
            <tr>
              <th style={thStyle}>NO</th>
              <th style={thStyle}>FOTO</th>
              <th style={thStyle}>PRODUK</th>
              <th style={thStyle}>QTY</th>
              <th style={thStyle}>HARGA</th>
              <th style={thStyle}>SUBTOTAL</th>
              <th style={thStyle}>PILIH</th>
              <th style={thStyle}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id} style={trStyle}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>
                  <img
                    src={`http://localhost:5001${item.foto}`}
                    alt={item.nama}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  />
                </td>
                <td style={tdStyle}>{item.nama}</td>
                <td style={tdStyle}>
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    onChange={(e) =>
                      setCart((prevCart) =>
                        prevCart.map((cartItem) =>
                          cartItem.id === item.id
                            ? {
                                ...cartItem,
                                qty: parseInt(e.target.value),
                                subtotal: cartItem.harga * parseInt(e.target.value),
                              }
                            : cartItem
                        )
                      )
                    }
                    style={{ width: "60px", padding: "5px", borderRadius: "4px" }}
                  />
                </td>
                <td style={tdStyle}>
                  Rp. {item.harga.toLocaleString("id-ID")}
                </td>
                <td style={tdStyle}>
                  Rp. {item.subtotal.toLocaleString("id-ID")}
                </td>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => {
                      if (selectedItems.includes(item.id)) {
                        setSelectedItems(selectedItems.filter((id) => id !== item.id));
                      } else {
                        setSelectedItems([...selectedItems, item.id]);
                      }
                    }}
                  />
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => {
                      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
                      setSelectedItems(selectedItems.filter((id) => id !== item.id));
                    }}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "20px", fontSize: "18px", textAlign: "right" }}>
        <b>Total Belanja: </b> Rp. {calculateTotal().toLocaleString("id-ID")}
      </div>

      <button
        onClick={openModal}
        disabled={selectedItems.length === 0}
        style={{
          marginTop: "20px",
          backgroundColor: selectedItems.length === 0 ? "#ccc" : "#0d6efd",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "12px 25px",
          fontSize: "16px",
          cursor: selectedItems.length === 0 ? "not-allowed" : "pointer",
          float: "right",
        }}
      >
        Bayar
      </button>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
              Detail Pengiriman
            </h2>

            <label>Provinsi Asal:</label>
            <select
              value={form.originProvince}
              onChange={(e) => handleProvinceChange("origin", e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">Pilih Provinsi Asal</option>
              {provinsi.map((p) => (
                <option key={p.province_id} value={p.province_id}>
                  {p.province}
                </option>
              ))}
            </select>

            <label>Kota/Kabupaten Asal:</label>
            <select
              value={form.originCity}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, originCity: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">Pilih Kota Asal</option>
              {citiesOrigin.map((c) => (
                <option key={c.city_id} value={c.city_id}>
                  {c.city_name}
                </option>
              ))}
            </select>

            <label>Provinsi Tujuan:</label>
            <select
              value={form.destinationProvince}
              onChange={(e) => handleProvinceChange("destination", e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">Pilih Provinsi Tujuan</option>
              {provinsi.map((p) => (
                <option key={p.province_id} value={p.province_id}>
                  {p.province}
                </option>
              ))}
            </select>

            <label>Kota/Kabupaten Tujuan:</label>
            <select
              value={form.destinationCity}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, destinationCity: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">Pilih Kota Tujuan</option>
              {citiesDestination.map((c) => (
                <option key={c.city_id} value={c.city_id}>
                  {c.city_name}
                </option>
              ))}
            </select>

            <label>Berat (gram):</label>
            <input
              type="number"
              value={form.weight}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, weight: e.target.value }))
              }
              min="1"
              placeholder="Masukkan berat dalam gram"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            />

            <label>Kurir:</label>
            <select
              value={form.courier}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, courier: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">Pilih Kurir</option>
              <option value="jne">JNE</option>
              <option value="pos">POS</option>
              <option value="tiki">TIKI</option>
            </select>

            <button
              onClick={calculateShipping}
              style={{
                backgroundColor: "#0d6efd",
                color: "white",
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              Hitung Ongkir
            </button>

            {shippingOptions.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <h4>Pilih Layanan Pengiriman:</h4>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {shippingOptions.map((option) => (
                    <li key={option.service} style={{ marginBottom: "10px" }}>
                      <input
                        type="radio"
                        name="service"
                        value={option.service}
                        checked={selectedService === option.service}
                        onChange={() =>
                          handleSelectService(
                            option.service,
                            option.cost[0]?.value || 0
                          )
                        }
                        style={{ marginRight: "8px" }}
                      />
                      {option.service.toUpperCase()} - Rp.{" "}
                      {option.cost[0]?.value.toLocaleString("id-ID")} (
                      {option.cost[0]?.etd} hari)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <label>Alamat Lengkap:</label>
            <textarea
              value={form.addressDetail}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, addressDetail: e.target.value }))
              }
              rows="3"
              placeholder="Masukkan alamat lengkap pengiriman"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                marginBottom: "15px",
              }}
            ></textarea>

            <div style={{ textAlign: "right" }}>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={handleBayar}
                disabled={!selectedService}
                style={{
                  backgroundColor: selectedService ? "#198754" : "#ccc",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: selectedService ? "pointer" : "not-allowed",
                }}
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Keranjang;
