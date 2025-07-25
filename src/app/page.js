"use client";

import { useState } from "react";
import { db } from "./firebaseConfig"; // Ajuste o caminho se necessário
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [resultado, setResultado] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    musica: "",
    profissao: "",
    unica: "",
    chefao: "",
    personagem: "",
    meme: "",
    google: "",
    banda: "",
  });

  const randomDescriptions = [
    "um ork mutante viciado em comer lama e jogar terra nas pessoas",
    "uma fada elétrica que só fala em código binário",
    "um cavaleiro pixelado com espada de laser",
    "um mago do café que nunca dorme",
    "um robô dançarino que ama 8-bit",
    "uma ninja invisível que só aparece no fim do jogo",
    "um arqueiro cósmico que nunca erra o alvo",
    "uma princesa guerreira dos pixels perdidos",
    "um cientista maluco que cria monstros de pixels",
    "um fantasma do fliperama que assombra os controles",
    "um hacker do futuro que só fala em códigos secretos",
    "um samurai digital que corta bugs com katana",
    "um mercenário do espaço que adora pizza",
    "um feiticeiro do teclado que lança feitiços de HTML",
    "um piloto de hoverboard nas ruas neon",
    "um caçador de tesouros pixelados",
    "um DJ que controla a galáxia com música 8-bit",
    "um robô poeta que só rima em JavaScript",
    "um inventor maluco que cria máquinas do tempo",
    "um dragão pixel que cospe fogo eletrônico"
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const descricaoAleatoria = randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];

    const ficha = {
      ...formData,
      descricaoAleatoria,
      data: serverTimestamp(), // DATA DO SERVIDOR FIREBASE
    };

    try {
      await addDoc(collection(db, "fichas"), ficha);
      setResultado(`🎮 Obrigado, ${formData.nome}! Você é ${descricaoAleatoria}.`);
      setFormData({
        nome: "",
        telefone: "",
        email: "",
        musica: "",
        profissao: "",
        unica: "",
        chefao: "",
        personagem: "",
        meme: "",
        google: "",
        banda: "",
      });
    } catch (err) {
      console.error("Erro ao salvar ficha no Firestore:", err);
      setResultado("❌ Ocorreu um erro ao salvar sua ficha. Tente novamente.");
    }
  }

  return (
    <div className="container">
      <h1>Ficha Gamer</h1>
      <form onSubmit={handleSubmit}>
        {/* seu formulário aqui */}
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required value={formData.nome} onChange={handleChange} />
        <label htmlFor="telefone">Telefone:</label>
        <input type="tel" id="telefone" name="telefone" required value={formData.telefone} onChange={handleChange} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
        <label htmlFor="musica">Qual seria sua música tema se você entrasse em cena num filme?</label>
        <input type="text" id="musica" name="musica" required value={formData.musica} onChange={handleChange} />
        <label htmlFor="profissao">Qual seria sua profissão em um universo alternativo?</label>
        <input type="text" id="profissao" name="profissao" required value={formData.profissao} onChange={handleChange} />
        <label htmlFor="unica">Uma coisa que você acha que só você faz?</label>
        <input type="text" id="unica" name="unica" required value={formData.unica} onChange={handleChange} />
        <label htmlFor="chefao">Se sua vida fosse um jogo, qual seria o nome do chefão final?</label>
        <input type="text" id="chefao" name="chefao" required value={formData.chefao} onChange={handleChange} />
        <label htmlFor="personagem">Personagem de desenho com quem você mais se identifica:</label>
        <input type="text" id="personagem" name="personagem" required value={formData.personagem} onChange={handleChange} />
        <label htmlFor="meme">Se fosse virar um meme, qual seria a legenda?</label>
        <input type="text" id="meme" name="meme" required value={formData.meme} onChange={handleChange} />
        <label htmlFor="google">Qual foi a última coisa idiota que você pesquisou no Google?</label>
        <input type="text" id="google" name="google" required value={formData.google} onChange={handleChange} />
        <label htmlFor="banda">Nome de uma banda fictícia que você criaria:</label>
        <input type="text" id="banda" name="banda" required value={formData.banda} onChange={handleChange} />
        <button type="submit">Enviar</button>
      </form>

      <div id="resultado" style={{ whiteSpace: "pre-line", marginTop: "1rem" }}>
        {resultado}
      </div>
    </div>
  );
}
