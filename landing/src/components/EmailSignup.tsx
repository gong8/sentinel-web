import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Schema for stored email signups
const emailSignupSchema = z.array(
  z.object({
    email: z.string(),
    timestamp: z.string(),
  }),
);

export function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For MVP: Store in localStorage with Zod validation
    const raw = localStorage.getItem('capsule-signups');
    const parsed = emailSignupSchema.safeParse(raw ? JSON.parse(raw) : []);
    const emails = parsed.success ? parsed.data : [];
    emails.push({ email, timestamp: new Date().toISOString() });
    localStorage.setItem('capsule-signups', JSON.stringify(emails));

    setStatus('success');
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {status === 'success' ? (
        <p className="text-center text-emerald-400 font-medium">Thanks! We'll be in touch.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-card/50 border-border/50 focus:border-brand-500/50"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      )}
    </div>
  );
}
