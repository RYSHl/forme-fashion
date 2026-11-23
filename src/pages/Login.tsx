import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }

    login(email, password);
    navigate('/account');
  };

  const handleQuickFillDemo = (type: 'customer' | 'admin') => {
    if (type === 'customer') {
      setEmail('aarav.mehta@example.com');
      setPassword('demoPassword123');
    } else {
      setEmail('admin@forme.com');
      setPassword('adminSecret2026');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      showToast('Password Reset Link Sent', 'info', `A demo reset email was dispatched to ${forgotEmail}.`);
      setIsForgotPasswordOpen(false);
      setForgotEmail('');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-8">
        <span className="text-[11px] uppercase tracking-widest text-brand-muted">Client Portal</span>
        <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mt-1">
          Sign In
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Access your orders, saved addresses, and tailored wishlist.
        </p>
      </div>

      {/* Demo Credentials Helper Box */}
      <div className="bg-brand-soft border border-neutral-200 p-4 mb-6 text-xs text-brand-muted">
        <div className="flex items-center gap-1.5 font-medium text-black uppercase tracking-wider text-[11px] mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
          <span>Interactive Demo Mode</span>
        </div>
        <p className="mb-2 text-[11px]">
          Click below to auto-fill verified mock credentials:
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleQuickFillDemo('customer')}
            className="flex-1 py-1.5 bg-white border border-neutral-300 text-[10px] uppercase tracking-wider font-semibold hover:border-black transition-colors"
          >
            Demo Customer
          </button>
          <button
            type="button"
            onClick={() => handleQuickFillDemo('admin')}
            className="flex-1 py-1.5 bg-neutral-900 text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-black transition-colors"
          >
            Demo Admin
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1 font-medium">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full px-4 py-3 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium">
              Password
            </label>
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-[11px] text-brand-muted underline hover:text-black"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-black pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-neutral-200 text-center text-xs text-brand-muted">
        <span>Do not have an account? </span>
        <Link to="/register" className="text-black font-semibold underline hover:text-neutral-700">
          Create Account
        </Link>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white p-6 md:p-8 max-w-sm w-full border border-neutral-200 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <KeyRound className="w-5 h-5 text-black" />
              <h3 className="text-sm uppercase tracking-widest font-medium">Reset Password</h3>
            </div>
            <p className="text-xs text-brand-muted mb-4 leading-relaxed">
              Enter your account email. We will generate a mock password reset link.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-3">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="flex-1 py-2 border border-neutral-300 text-xs uppercase tracking-wider font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-black text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Send Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
