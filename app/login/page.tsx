import AcmeLogo from '@/app/ui/becl-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Inicio de sesión',
};
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-auto w-full items-end rounded-lg bg-secondaries_red-700 p-3 md:h-36">
          <div className="w-32 text-white md:w-36 flex flex-1">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}