import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-secondaries_red-700 px-4 text-sm font-medium text-white transition-colors hover:bg-secondaries_red-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondaries-bg-secondaries_red-700 active:bg-secondaries_red-900 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}
