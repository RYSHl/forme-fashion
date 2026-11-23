import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    register(name, email, phone);
    showToast('Registration Complete', 'success', 'Welcome to the FORME community.');
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-8">
        <span className="text-[11px] uppercase tracking-widest text-brand-muted">Membership</span>
        <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mt-1">
          Create Account
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Enjoy streamlined checkout, order tracking, and private previews.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1 font-medium">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aarav Mehta"
            required
            className="w-full px-4 py-3 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1 font-medium">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="aarav@example.com"
            required
            className="w-full px-4 py-3 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1 font-medium">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1 font-medium">
            Password (Min. 6 characters)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
        >
          Create Account
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-neutral-200 text-center text-xs text-brand-muted">
        <span>Already have a client profile? </span>
        <Link to="/login" className="text-black font-semibold underline hover:text-neutral-700">
          Sign In
        </Link>
      </div>
    </div>
  );
};
