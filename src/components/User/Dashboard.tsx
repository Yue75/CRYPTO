import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface User {
  username: string;
  token: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

 
  return (
    <div className="dashboard">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Bienvenue, {user.username}!</h1>
          <p className="mt-4">Voici votre tableau de bord.</p>
          <img src="/src/assets/Zemmour.jpg" alt="" />
        
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Dashboard;
