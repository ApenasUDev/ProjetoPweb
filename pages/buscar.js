import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Busca = () => {
    const [nomeCard, setNomeCard] = useState('');
    const [tipoSelecionado, setTipoSelecionado] = useState('opcao1'); 
    const [cards, setCards] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/buscarcards/', {
                params: { nome_card: nomeCard, tipo: tipoSelecionado }
            });

            setCards(response.data.cards);
        } catch (error) {
            console.error('Erro na busca:', error);
            setCards([]);
        }
    };

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
                    alt="Yu-Gi-Oh Page 2"
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
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>Buscar Cartas de Yu-Gi-Oh!</h1>
            <input
                type="text"
                placeholder="Digite ..."
                value={nomeCard}
                onChange={(e) => setNomeCard(e.target.value)}
                style={{
                    position: 'fixed',
                    top: '10px',
                    right: '20px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    padding: '10px',
                    fontSize: '18px'
                }}
            />

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'fixed',
                top: '80px',
                right: '20px',
                width: '200px'  
            }}>
                <select value={tipoSelecionado} onChange={(e) => setTipoSelecionado(e.target.value)} style={{
                        marginBottom: '20px',
                        padding: '10px',
                        borderRadius: '5px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}>
                    <option value="opcao1">Tipo</option>
                    <option value="opcao2">Atributo</option>
                    <option value="opcao3">Raça</option>
                </select>

                <button onClick={handleSearch} style={{
                    marginBottom: '20px',
                    padding: '10px',
                    fontSize: '18px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    cursor: 'pointer',
                }}>Buscar</button>
            </div>

            <ul style={{ padding: 0 }}>
                {cards.map((card) => (
                    <li key={card.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}>
                        <img src={card.image} alt={card.name} />
                        <div style={{
                            marginLeft: '20px',
                            marginRight: '20px',
                            color: 'gold',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}>
                            <p>Nome: {card.name}</p>
                            <p>Tipo: {card.type}</p>
                            <p>Ataque: {card.atk}</p> 
                            <p>Defesa: {card.def}</p>
                            <p>Nível: {card.level}</p>
                            <p>Raça: {card.race}</p>
                            <p>Atributo: {card.attribute}</p>
                            <p>Descrição: {card.desc}</p>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default Busca;
