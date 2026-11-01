import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // 'info' | 'success' | 'error'

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');

    if (type !== 'password_recovery') {
      setMessage('Invalid or expired reset link.');
      setMessageType('error');
      return;
    }

    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
      setMessageType('error');
    } else {
      setMessage('Password reset successfully! You can now sign in.');
      setMessageType('success');
      setTimeout(() => navigate('/login'), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-slate-100 font-sans">
      <div className="mx-auto w-full max-w-md px-8 py-12 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-brand-navy text-center mb-8">Reset Password</h1>

        {message && (
          <p className={`text-sm text-center mb-6 p-3 rounded ${
            messageType === 'success'
              ? 'text-brand-green bg-brand-green/10 border border-brand-green/20'
              : messageType === 'error'
              ? 'text-red-600 bg-red-50 border border-red-100'
              : 'text-slate-600 bg-slate-50 border border-slate-200'
          }`}>{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">New Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-3 pr-10 text-sm text-slate-900 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-3 pr-10 text-sm text-slate-900 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
              placeholder="••••••••"
            />
          </div>

          <Button variant="primary" className="w-full py-3" type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Remember your password?{' '}
          <a href="/login" className="text-brand-green font-medium hover:text-brand-green/80">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;