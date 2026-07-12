import { SignIn, ClerkProvider } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <SignIn
        fallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-[#111111] border border-white/10 shadow-2xl',
          },
        }}
      />
    </div>
  );
}
