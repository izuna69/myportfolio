import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectApi } from '../api/projectApi';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await projectApi.login(username, password);
      if (response.token) {
        sessionStorage.setItem('adminToken', response.token);
        onSuccess();
        onClose();
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#1e1e1e] rounded-xl p-6 w-full max-w-sm shadow-2xl border border-gray-700"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>

          {error && <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded border border-red-800 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-400">Username</label>
              <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-400">Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white focus:border-emerald-500 focus:outline-none" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded disabled:opacity-50 mt-4">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginModal;
