import { SignIn as AuthWidget } from '@app/widgets/auth/sign-in';

export default function SignIn() {
  return (
    <main className='flex flex-col w-full items-center pt-12 space-y-2'>
      <AuthWidget />
    </main>
  );
}
