import clsx from 'clsx';

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <main className={clsx('flex items-center', className)}>
      <img
        src='/logo.png'
        alt='app-logo'
        className='w-6 h-6'
      />
      <span className='tracking-wide text-lg font-mono'>stitch</span>
    </main>
  );
};
