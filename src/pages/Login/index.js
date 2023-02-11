import React, { useState } from 'react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    // Enviar os dados do formulário para a API
    const response = await fetch('http://localhost/hotmart_telegram/api_php/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
      // Redirecionar o usuário para a página inicial
      window.location.href = '/';
    } else {
      setError(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome de usuário:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Senha:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Entrar</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;