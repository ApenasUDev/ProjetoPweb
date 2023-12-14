import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

const UserLog = () => {
  const [userData, setUserData] = useState(null);
  const [nomeCard, setNomeCard] = useState(''); // Add this line
  const [tipoSelecionado, setTipoSelecionado] = useState('opcao1'); // Add this line
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [cardsfav, setCardsfav] = useState([]);
  const [favoritedCards, setFavoritedCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('https://projetopwebapi.fly.dev/users/dados-do-usuario/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setUserData(response.data);
            const responseCards = await axios.get('https://projetopwebapi.fly.dev/visucards/');
            setCards(responseCards.data.cards);
            // Initialize favorited status for each card
            const initialFavoritedStatus = responseCards.data.cards.map(() => false);
            setFavoritedCards(initialFavoritedStatus);
          } else {
            console.error('Error fetching user data:', response.statusText);
            router.push('login');
          }

        } catch (error) {
          console.error('Error fetching user data:', error);
          router.push('login');
        }
      } else {
        router.push('login');
      }
    };

    fetchData();
  }, []);

  const favoritarCard = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://projetopwebapi.fly.dev/favoritar-card/', {

        params: { id_card: id, usuario: userData.username, } // assuming username is used as the user identifier
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success or display a message to the user
      console.log(response.data);
    } catch (error) {
      console.error('Error favoriting card:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('login');
  };

  const [currentView, setCurrentView] = useState('all'); // 'all' or 'favorites'

  const favoritoButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');

      if (currentView === 'all') {
        const responseCards = await axios.get('https://projetopwebapi.fly.dev/favoritos/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (responseCards.status === 200) {
          setCardsfav(responseCards.data.cards);
          setCurrentView('favorites');
        } else {
          console.error('Error fetching favorite cards:', responseCards.statusText);
        }
      } else {
        // If currentView is 'favorites', switch back to displaying all cards
        setCurrentView('all');
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };
  const clearSearch = () => {
    setNomeCard(''); // Clear the search field
    // Fetch and set images from visucards
    const fetchVisuCards = async () => {
      try {
        const responseVisuCards = await axios.get('https://projetopwebapi.fly.dev/visucards/');
        setCards(responseVisuCards.data.cards);
      } catch (error) {
        console.error('Error fetching visucards:', error);
      }
    };

    fetchVisuCards();
  };
  const desfavoritarCard = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://projetopwebapi.fly.dev/desfavoritar-card/', {
        params: { id_card: id, usuario: userData.username },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update favorited status in the state
      setFavoritedCards((prevFavoritedCards) => {
        const updatedFavoritedCards = [...prevFavoritedCards];
        const index = updatedFavoritedCards.findIndex((card) => card.id === id);
        if (index !== -1) {
          updatedFavoritedCards[index].favorited = false;
        }
        return updatedFavoritedCards;
      });

      // Fetch and set the updated list of favorited cards
      await fetchFavoritos();

      console.log(response.data);
    } catch (error) {
      console.error('Error unfavoriting card:', error);
    }
  };

  const fetchFavoritos = async () => {
    try {
      const token = localStorage.getItem('token');
      const responseCards = await axios.get('https://projetopwebapi.fly.dev/favoritos/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (responseCards.status === 200) {
        setCardsfav(responseCards.data.cards);
      } else {
        console.error('Error fetching favorite cards:', responseCards.statusText);
      }
    } catch (error) {
      console.error('Error fetching favoritos:', error);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get('https://projetopwebapi.fly.dev/buscarcards/', {
        params: { nome_card: nomeCard, tipo: tipoSelecionado }
      });

      setCards(response.data.cards);
    } catch (error) {
      console.error('Erro na busca:', error);
      setCards([]); // Limpa os resultados em caso de erro
    }
  };

  return (
    <div>
      <div
        style={{
          zIndex: -1, position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0,
        }}
      >
        <Image src="/background7.jpg" alt="Yu-Gi-Oh Page 5" layout="fill" objectFit="cover" />
      </div>

      <div>
        <nav style={{
          backgroundColor: 'rgba(205, 133, 63, 0.5)', width: '100%', height: '80px', borderRadius: '0 0 50% 50%', margin: '0', position: 'fixed', top: 0, zIndex: 999, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '0 20px', boxSizing: 'border-box',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              name="favoritos"
              onClick={favoritoButtonClick}
              style={{
                display: 'inline-block', marginBottom: '20px', padding: '10px 20px', fontSize: '16px', borderRadius: '5px',
                border: 'none', color: 'gold', textDecoration: 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              {currentView === 'all' ? 'Favoritos' : 'Ver Todos'}
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: 'inline-block', marginBottom: '20px', padding: '10px 20px',
                fontSize: '16px', borderRadius: '5px', border: 'none', color: 'gold', textDecoration: 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)', marginLeft: '10px',
              }}>
              disconnect
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>

            <button onClick={clearSearch}
              style={{
                marginLeft: '10px', marginBottom: '20px', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', border: 'none', color: 'gold', textDecoration: 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>Limpar Busca</button>
            <input
              type="text"
              placeholder="Digite ..."
              value={nomeCard}
              onChange={(e) => setNomeCard(e.target.value)}
              style={{ borderRadius: '5px', padding: '10px', fontSize: '18px' }}
            />
            <select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
              style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', fontSize: '18px', cursor: 'pointer', marginLeft: '10px', }}>
              <option value="opcao1">Tipo</option>
              <option value="opcao2">Atributo</option>
              <option value="opcao3">Raça</option>
            </select>
            <button
              onClick={handleSearch}
              style={{ marginBottom: '20px', padding: '10px', fontSize: '18px', borderRadius: '5px', border: 'none', color: 'white', backgroundColor: '#007BFF', cursor: 'pointer', marginLeft: '10px', }}>
              Buscar
            </button>
          </div>
        </nav>

        <ul style={{ padding: 0 }}>
          {currentView === 'favorites'
            ? cardsfav.map((card) => (
              <li key={card.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src={card.image} alt={card.name} />
                <button onClick={() => desfavoritarCard(card.id)}>
                  <img src='/naofav.png' alt='nao fav' style={{ width: '30px' }} />
                </button>
                <div style={{ marginLeft: '20px', marginRight: '20px', color: 'gold', padding: '10px 20px', borderRadius: '5px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                  {card.type === 'Trap Card' || card.type === 'Spell Card' ? (
                    <>
                      <p>Nome: {card.name}</p>
                      <p>Tipo: {card.type}</p>
                      <p>Raça: {card.race}</p>
                      <p>Descrição: {card.desc}</p>
                    </>
                  ) : (
                    <div>
                      <p>Nome: {card.name}</p>
                      <p>Tipo: {card.type}</p>
                      <p>Ataque: {card.atk}</p>
                      <p>Defesa: {card.def}</p>
                      <p>Nível: {card.level}</p>
                      <p>Raça: {card.race}</p>
                      <p>Atributo: {card.attribute}</p>
                      <p>Descrição: {card.desc}</p>
                    </div>
                  )}
                </div>
              </li>
            ))
            : cards.map((card) => (
              <li key={card.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src={card.image} alt={card.name} />
                <button onClick={() => favoritarCard(card.id)}>
                  <img src='/naofav.png' alt='nao fav' style={{ width: '30px' }} />
                </button>
                <div style={{ marginLeft: '20px', marginRight: '20px', color: 'gold', padding: '10px 20px', borderRadius: '5px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                  {card.type === 'Trap Card' || card.type === 'Spell Card' ? (
                    <>
                      <p>Nome: {card.name}</p>
                      <p>Tipo: {card.type}</p>
                      <p>Raça: {card.race}</p>
                      <p>Descrição: {card.desc}</p>
                    </>
                  ) : (
                    <div>
                      <p>Nome: {card.name}</p>
                      <p>Tipo: {card.type}</p>
                      <p>Ataque: {card.atk}</p>
                      <p>Defesa: {card.def}</p>
                      <p>Nível: {card.level}</p>
                      <p>Raça: {card.race}</p>
                      <p>Atributo: {card.attribute}</p>
                      <p>Descrição: {card.desc}</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div >
  );
};

export default UserLog;
