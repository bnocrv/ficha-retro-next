"use client";

import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function ListarFichas() {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFichas() {
      try {
        const q = query(collection(db, "fichas"), orderBy("data", "desc"));
        const snap = await getDocs(q);
        const fichasArray = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFichas(fichasArray);
      } catch (error) {
        console.error("Erro ao buscar fichas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFichas();
  }, []);

  if (loading) return <p>🔄 Carregando fichas...</p>;

  if (fichas.length === 0) return <p>⚠️ Nenhuma ficha encontrada.</p>;

  return (
    <div>
      <h2>📝 Fichas Registradas</h2>
      <ul style={{ paddingLeft: 0 }}>
        {fichas.map(f => (
          <li key={f.id} style={{ marginBottom: "1rem", listStyle: "none", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
            <strong>{f.nome}</strong><br />
            <em>{f.descricaoAleatoria}</em><br />
            📅 {new Date(f.data).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
