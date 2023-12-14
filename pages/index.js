import Image from 'next/image';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start', 
      height: '100vh',
      position: 'relative',
      paddingLeft: '50px' 
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
          src="/background1.jpg"
          alt="Yu-Gi-Oh Stantard Page"
          layout="fill"
          objectFit="cover"
        /> 
      </div>
      <a href="login" style={linkStyle}><h2>Login</h2></a> 
      <a href="register" style={linkStyle}><h2>Registrar-se</h2></a> 
      <a href="buscar" style={linkStyle}><h2>Buscar Cards</h2></a> 
      <a href="visucads" style={linkStyle}><h2>Visualizar Cards</h2></a> 
      
    </div>
  );
};

const linkStyle = {
  display: 'inline-block',
  marginBottom: '20px',
  padding: '10px 20px',
  fontSize: '16px', 
  borderRadius: '5px',
  border: 'none',
  color: 'gold',
  textDecoration: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  borderRadius: '5px'
};