import React, { useState } from 'react';
import { Lock, ArrowRight, Loader2, Eye } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onLogin: (password: string) => Promise<boolean>;
  onGuestMode?: () => void; // 新增游客模式回调
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onLogin, onGuestMode }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const success = await onLogin(password);
    if (!success) {
      setError('密码错误或无法连接服务器');
    }
    setIsLoading(false);
  };

  const handleGuestMode = () => {
    if (onGuestMode) {
      onGuestMode();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
            <Lock size={32} />
          </div>
          <h2 className="text-xl font-bold dark:text-white">欢迎访问</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
            请选择访问方式
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-center tracking-widest"
              placeholder="访问密码"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <>管理员登录 <ArrowRight size={18} /></>}
          </button>

          {onGuestMode && (
            <button
              type="button"
              onClick={handleGuestMode}
              className="w-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Eye size={18} />
              游客浏览
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
