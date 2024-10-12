// useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase'; // Adjust the import path as necessary

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/'); // Redirect to login if not authenticated
      }
    };

    checkUser();
  }, [navigate]);
};

export default useAuth;
