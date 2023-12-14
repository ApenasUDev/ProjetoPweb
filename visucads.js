import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Visu() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://projetopwebapi.fly.dev/visucards/');
        const data = await response.json();
        console.log(data); // Verifique se os dados são impressos corretamente
        setCards(data.cards);
        console.log(cards)
      } catch (error) {
        console.error('Erro ao buscar dados do backend:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <div style={{
        zIndex: -1,
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0
      }}>

        <Image
          src="/background7.jpg"
          alt="Yu-Gi-Oh Page 5"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <a href='../' style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          color: 'white',
          textDecoration: 'none',
          padding: '10px 20px',
          fontSize: '18px',
          borderRadius: '5px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          cursor: 'pointer'
        }}>Voltar</a>

        <ul style={{ padding: 0 }}>
          {cards.map((card) =>
            card.image_small ? ( // Verifica se há uma imagem associada
              <li
                key={card.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <img src={card.image_small} alt={card.name} style={{ width: 'auto', height: 'auto' }} />
                <div
                  style={{
                    marginLeft: '20px',
                    marginRight: '20px',
                    color: 'gold',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {card.type === 'Trap Card' || card.type === 'Spell Card' ? (
                    <>
                      <p>Nome: {card.name}</p>
                      {/* <p>Tipo: {card.type}</p>
                      <p>Raça: {card.race}</p>
                      <p>Descrição: {card.desc}</p> */}
                    </>
                  ) : (
                    <div>
                      <p>Nome: {card.name}</p>
                      {/* <p>Tipo: {card.type}</p>
                      <p>Ataque: {card.atk}</p>
                      <p>Defesa: {card.def}</p> */}
                      <p>Nível: {card.level}</p>
                      {/* <p>Raça: {card.race}</p>
                      <p>Atributo: {card.attribute}</p> */}
                      {/* <p>Descrição: {card.desc}</p> */}
                    </div>
                  )}
                </div>
              </li>
            ) : null // Se não houver imagem, não renderiza nada
          )}
        </ul>

      </div>
    </div>
  );
};

