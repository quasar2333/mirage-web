import React, { useState } from 'react';
import { User, Lock, Mail, UserPlus } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('mirage-users') || '[]');
    if (users.find((user: any) => user.email === email)) {
      setError('User with this email already exists.');
      return;
    }
    users.push({ email, password });
    localStorage.setItem('mirage-users', JSON.stringify(users));
    sessionStorage.setItem('mirage-user', JSON.stringify({ email }));
    onAuthSuccess();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('mirage-users') || '[]');
    const user = users.find((user: any) => user.email === email);
    if (!user || user.password !== password) {
      setError('Invalid email or password.');
      return;
    }
    sessionStorage.setItem('mirage-user', JSON.stringify({ email }));
    onAuthSuccess();
  };

  return (
    <div className="flex items-center justify-center h-full w-full bg-[var(--theme-bg-primary)]">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[var(--theme-bg-secondary)] rounded-xl shadow-premium">
        <h1 className="text-3xl font-bold text-center text-[var(--theme-text-primary)]">Mirage镜像站</h1>
        
        <div className="flex border-b border-[var(--theme-border-primary)]">
          <button onClick={() => { setIsRegistering(false); setError(''); }} className={`flex-1 py-2 text-sm font-medium transition-colors ${!isRegistering ? 'text-[var(--theme-text-link)] border-b-2 border-[var(--theme-border-focus)]' : 'text-[var(--theme-text-tertiary)] hover:text-[var(--theme-text-primary)]'}`}>
            登录
          </button>
          <button onClick={() => { setIsRegistering(true); setError(''); }} className={`flex-1 py-2 text-sm font-medium transition-colors ${isRegistering ? 'text-[var(--theme-text-link)] border-b-2 border-[var(--theme-border-focus)]' : 'text-[var(--theme-text-tertiary)] hover:text-[var(--theme-text-primary)]'}`}>
            注册
          </button>
        </div>
        
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-tertiary)]" size={18} />
            <input type="email" placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-[var(--theme-bg-input)] border border-[var(--theme-border-secondary)] rounded-md focus:ring-1 focus:ring-[var(--theme-border-focus)] text-[var(--theme-text-primary)] placeholder-[var(--theme-text-tertiary)]" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-tertiary)]" size={18} />
            <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-[var(--theme-bg-input)] border border-[var(--theme-border-secondary)] rounded-md focus:ring-1 focus:ring-[var(--theme-border-focus)] text-[var(--theme-text-primary)] placeholder-[var(--theme-text-tertiary)]" />
          </div>
          
          {error && <p className="text-sm text-center text-[var(--theme-text-danger)]">{error}</p>}
          
          <button type="submit" className="w-full py-2 px-4 bg-[var(--theme-bg-accent)] hover:bg-[var(--theme-bg-accent-hover)] text-[var(--theme-text-accent)] font-semibold rounded-md transition-colors flex items-center justify-center gap-2">
            {isRegistering ? <UserPlus size={18} /> : <User size={18} />}
            <span>{isRegistering ? '注册' : '登录'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
