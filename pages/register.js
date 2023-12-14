import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.get('https://projetopwebapi.fly.dev/users/register/', {
                params: { username, email, password, password_confirm, name }
            });

            // Limpar os campos após o registro bem-sucedido
            setUserName('');
            setEmail('');
            setPassword('');
            setPasswordConfirm('');
            setName('');
        } catch (error) {
            console.error('Erro na busca:', error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            position: 'relative'
        }}>
            <div style={{
                zIndex: -1,
                position: "fixed",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0
            }}>
                <Image
                    src="/background9.jpg"
                    alt="Yu-Gi-Oh Page 4"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    fontSize: '18px'
                }}
            />
            <input
                type="text"
                placeholder="Nome de Usuário"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    fontSize: '18px'
                }}
            />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    fontSize: '18px'
                }}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    fontSize: '18px'
                }}
            />
            <input
                type="password"
                placeholder="Confirmar Senha"
                value={password_confirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    fontSize: '18px'
                }}
            />
            <button onClick={handleRegister} style={{
                padding: '10px 20px',
                fontSize: '18px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#007BFF',
                color: 'white',
                cursor: 'pointer'
            }}>Registrar-se</button>
            <a href='../' style={{
                position: 'absolute',
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
        </div>
    )
}
export default Register;