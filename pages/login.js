import React, { useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Image from 'next/image';
const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
   
    const handleLogin = async () => {
        if (!username || !password) {
            console.error('Nome de usuário e senha são obrigatórios.');
            return;
        }

        try {
            const response = await axios.get('https://projetopwebapi.fly.dev/users/login/', {
                params:{ username: username,password: password,}
            });

            if (response.status === 200) {
                // Lidar com o login bem-sucedido
                console.log('Login bem-sucedido');
                console.log('Token:', response.data.token);

                // Armazenar o token no localStorage (ou outro método de armazenamento)
                localStorage.setItem('token', response.data.token);

                // Redirecionar para a página de usuário logado
                router.push('userlog')
            } else {
                console.error('Login falhou. Status:', response.status);
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
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
                    alt="Yu-Gi-Oh Page 3"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
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
            <button onClick={handleLogin} style={{
                padding: '10px 20px',
                fontSize: '18px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#007BFF',
                color: 'white',
                cursor: 'pointer'
            }}>Login</button>
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
    );
};

export default Login;