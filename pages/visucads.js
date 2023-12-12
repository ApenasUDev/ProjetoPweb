import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Visu() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/visucards/');
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
            <h1 style={{
              position: 'fixed', 
              left: '10px', 
              top: 0,
              color: 'white',
              textDecoration: 'none',
              padding: '10px 20px',
              fontSize: '18px',
              borderRadius: '5px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>Cartas de Yu-Gi-Oh!</h1>
            <ul style={{ padding: 0 }}>
                {cards.map(cards => (
                    <li key={cards.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px', 
                    }}>
                        <img src={cards.image} alt={cards.name} />
                        <div style={{ 
                            marginLeft: '20px',
                            marginRight: '20px', 
                            color: 'gold',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        }}>
                            <p>Nome: {cards.name}</p>
                            <p>Tipo: {cards.type}</p>
                            <p>Ataque: {cards.atk}</p> 
                            <p>Defesa: {cards.def}</p>
                            <p>Nível: {cards.level}</p>
                            <p>Raça: {cards.race}</p>
                            <p>Atributo: {cards.attribute}</p>
                            <p>Descrição: {cards.desc}</p>
                        </div>
                    </li>
                ))}
            </ul>
          </div>
        </div>
    );
};


