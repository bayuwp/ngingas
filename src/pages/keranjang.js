import React, { useEffect, useState } from "react";
import axios from 'axios';

const Keranjang = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [citiesOrigin, setCitiesOrigin] = useState([]);
  const [citiesDestination, setCitiesDestination] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/keranjang");
        if (!response.ok) {
          throw new Error("Gagal mengambil data keranjang");
        }
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://api.rajaongkir.com/starter/province', {
          headers: {
            key: 'BbGYhRdG14dd8a53df9df14dvHswcbMc'
          }
        });

        if (response.data.rajaongkir && response.data.rajaongkir.results) {
          setProvinsi(response.data.rajaongkir.results);
        } else {
          console.error('Format respons tidak sesuai:', response.data);
        }
      } catch (error) {
        console.error('Gagal mengambil data provinsi:', error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = (type, provinceId) => {
    setForm((prev) => ({
      ...prev,
      ...(type === "origin"
        ? { originProvince: provinceId, originCity: "" }
        : { destinationProvince: provinceId, destinationCity: "" }),
    }));

    fetchCitiesByProvince(provinceId, type);
  };

  const fetchCitiesByProvince = async (provinceId, type) => {
    if (!provinceId) return;
    try {
      const response = await axios.get(
        `https://api.rajaongkir.com/starter/city?province=${provinceId}`,
        {
          headers: {
            key: "BbGYhRdG14dd8a53df9df14dvHswcbMc",
          },
        }
      );
      const cities = response.data.rajaongkir.results;
      if (type === "origin") {
        setCitiesOrigin(cities);
      } else if (type === "destination") {
        setCitiesDestination(cities);
      }
    } catch (err) {
      console.error("Gagal mengambil data kota:", err);
    }
  };

  const calculateWeight = () => {
    const selected = cart.filter((item) => selectedItems.includes(item.id));
    const totalWeight = selected.reduce((sum, item) => sum + item.qty * 200, 0);
    setForm((prev) => ({ ...prev, weight: totalWeight }));
    return totalWeight;
  };

  const calculateShipping = async () => {
    const weight = calculateWeight();
    try {
      const response = await fetch(`${process.env.REACT_APP_RAJAONGKIR_BASE_URL}cost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          key: process.env.REACT_APP_RAJAONGKIR_API_KEY,
        },
        body: JSON.stringify({
          origin: form.originCity,
          destination: form.destinationCity,
          weight,
          courier: form.courier,
        }),
      });
      const data = await response.json();
      const cost = data.rajaongkir.results[0].costs[0].cost[0].value;
      setShippingCost(cost);
    } catch (error) {
      console.error("Gagal menghitung ongkir:", error);
    }
  };

  const calculateTotal = () => {
    return cart
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.subtotal, 0);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "28px", color: "#333" }}>
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
                    style={{
                      width: "60px",
                      padding: "4px 6px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td style={tdStyle}>Rp {item.harga.toLocaleString("id-ID")}</td>
                <td style={tdStyle}>Rp {item.subtotal.toLocaleString("id-ID")}</td>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() =>
                      setSelectedItems((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((itemId) => itemId !== item.id)
                          : [...prev, item.id]
                      )
                    }
                  />
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => alert("Belum ada fungsi hapus")}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
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

      <button
        onClick={openModal}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#0d6efd",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Checkout
      </button>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              width: "600px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Checkout Produk</h3>
            <div style={{ marginBottom: "15px" }}>
              <label>Provinsi Asal:</label>
              <select
                onChange={(e) => {
                  const provinceId = e.target.value;
                  setForm((prev) => ({ ...prev, originProvince: provinceId }));
                  fetchCitiesByProvince(provinceId, "origin");
                }}
                value={form.originProvince}
                style={selectStyle}
              >
                <option value="">Pilih Provinsi Asal</option>
                {provinsi.map((prov) => {
                  console.log("Rendering Provinsi:", prov); // Debugging
                  return (
                    <option key={prov.province_id} value={prov.province_id}>
                      {prov.province}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Kota Asal:</label>
              <select
                onChange={(e) => setForm((prev) => ({ ...prev, originCity: e.target.value }))}
                value={form.originCity}
                style={selectStyle}
              >
                <option value="">Pilih Kota</option>
                {citiesOrigin.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Provinsi Tujuan:</label>
              <select
                onChange={(e) => handleProvinceChange("destination", e.target.value)}
                value={form.destinationProvince}
                style={selectStyle}
              >
                <option value="">Pilih Provinsi</option>
                {provinsi.map((prov) => (
                  <option key={prov.province_id} value={prov.province_id}>
                    {prov.province}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Kota Tujuan:</label>
              <select
                onChange={(e) => setForm((prev) => ({ ...prev, destinationCity: e.target.value }))}
                value={form.destinationCity}
                style={selectStyle}
              >
                <option value="">Pilih Kota</option>
                {citiesDestination.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Kurir:</label>
              <select
                onChange={(e) => setForm((prev) => ({ ...prev, courier: e.target.value }))}
                value={form.courier}
                style={selectStyle}
              >
                <option value="">Pilih Kurir</option>
                <option value="jne">JNE</option>
                <option value="pos">POS</option>
                <option value="tiki">TIKI</option>
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Alamat Lengkap:</label>
              <textarea
                rows="3"
                value={form.addressDetail}
                onChange={(e) => setForm((prev) => ({ ...prev, addressDetail: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              ></textarea>
            </div>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <button
                onClick={calculateShipping}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Hitung Ongkir
              </button>
              <button
                onClick={closeModal}
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Batal
              </button>
            </div>

            {shippingCost > 0 && (
              <div style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center" }}>
                Total Ongkir: Rp {shippingCost.toLocaleString("id-ID")} <br />
                Total Belanja: Rp {(calculateTotal() + shippingCost).toLocaleString("id-ID")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
};

const thStyle = {
  padding: "12px",
  textAlign: "center",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "12px",
  textAlign: "center",
  backgroundColor: "#fff",
};

const trStyle = {
  borderBottom: "1px solid #eee",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export default Keranjang;
