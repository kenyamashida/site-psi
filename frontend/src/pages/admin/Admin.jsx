import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { getToken, setToken, removeToken } from '../../lib/auth';
import { API_URL } from '../../lib/api';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) return res.json();
        removeToken();
        return null;
      })
      .then((data) => {
        if (data) setUser(data);
        setLoading(false);
      })
      .catch(() => {
        removeToken();
        setLoading(false);
      });
  }, []);

  const handleLogin = (token, userData) => {
    setToken(token);
    setUser(userData);
  };

  const handleLogout = () => {
    removeToken();
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={handleLogin} API_URL={API_URL} />;
  }

  return (
    <AdminDashboard
      user={user}
      onLogout={handleLogout}
      API_URL={API_URL}
    />
  );
}
