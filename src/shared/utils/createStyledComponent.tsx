interface ComponentProps {
  children: React.ReactNode;
}

interface ComponentFactoryProps {
  className?: string;
}

const createStyledComponent = (baseClassName: string) => {
  return ({ className, children }: ComponentProps & ComponentFactoryProps) => {
    const combinedClassName = `${baseClassName} ${className}`;
    return <div className={combinedClassName}>{children}</div>;
  };
};

export default createStyledComponent;
