import { useState } from 'react';
import { supabase } from '../../supabase';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        setMessage('অ্যাকাউন্ট তৈরির অনুরোধ সফল। ইমেইল যাচাই করুন।');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage('লগইন সফল হয়েছে।');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) setMessage(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-green-800">
          OpenType Bangladesh
        </h1>
        <p className="mb-7 text-center text-slate-600">
          {isSignup ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'আপনার অ্যাকাউন্টে লগইন করুন'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">ইমেইল ঠিকানা</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৬ অক্ষর"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? 'অপেক্ষা করুন...' : isSignup ? 'অ্যাকাউন্ট তৈরি করুন' : 'লগইন করুন'}
          </button>
        </form>

        <div className="my-5 text-center text-sm text-slate-500">অথবা</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-lg border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Google দিয়ে লগইন করুন
        </button>

        {message && (
          <p className="mt-4 break-words text-center text-sm text-green-700">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-600">
          {isSignup ? 'আগে থেকেই অ্যাকাউন্ট আছে?' : 'নতুন ব্যবহারকারী?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage('');
            }}
            className="font-semibold text-green-700 hover:underline"
          >
            {isSignup ? 'লগইন করুন' : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>
        </p>
      </div>
    </div>
  );
}
