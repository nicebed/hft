import { useAppDispatch } from '@app/app/store/hooks';
import { sidebarModel } from '..';
import clsx from 'clsx';

export const Toggle = () => {
  const dispatch = useAppDispatch();
  const isSideBarOpen = sidebarModel.useShowSidebar();

  const toggle = () => {
    dispatch(sidebarModel.actions.toggle());
  };

  return (
    <header className='fixed top-0 left-0 w-full h-12 bg-white/90 z-30 flex justify-between lg:hidden items-center'>
      <button
        className={clsx(
          isSideBarOpen && 'opacity-0',
          'flex flex-col space-y-2 h-12 w-12 bg-transparent outline-none border-none items-start justify-center ml-2 pl-2 cursor-pointer transition-opacity delay-300'
        )}
        onClick={toggle}
      >
        <span className='block w-8 h-0.5 rounded bg-gray-400'></span>
        <span className='block w-5 h-0.5 rounded bg-gray-400'></span>
      </button>

      <img
        src='/logo.png'
        alt='app-logo'
        className={clsx(isSideBarOpen && 'blur-[2px]', 'w-8 h-8 mr-3')}
      />
    </header>
  );
};
