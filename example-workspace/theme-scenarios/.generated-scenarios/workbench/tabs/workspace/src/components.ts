export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ComponentProps> = ({ className, children }) => {
  return (
    <button className={`btn ${className || ''}`}>
      {children}
    </button>
  );
};

export const Card: React.FC<ComponentProps> = ({ className, children }) => {
  return (
    <div className={`card ${className || ''}`}>
      {children}
    </div>
  );
};