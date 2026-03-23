import { cn } from '../lib/utils';

const Logo = ({ className }) => (
  <div className={cn('flex items-center gap-2', className)}>
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
    >
      <path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18C12 18 14 14 16 14C18 14 20 18 20 18"
        stroke="hsl(195 25% 45%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12C12 12 14 16 16 16C18 16 20 12 20 12"
        stroke="hsl(195 25% 45%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="font-bold text-xl text-foreground">SitePsicologia</span>
  </div>
);

export default Logo;
