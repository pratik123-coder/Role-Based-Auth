import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-black">
      <div className="space-y-6 text-center">
         <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          SentryKey
         </h1>
         <p className="text-white text-lg">Role based authentication app</p>
         <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
         </div>
      </div>

    </main>
  );
}
