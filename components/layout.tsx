import React from 'react';

type ContainerProps = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Container = ({ children, size }: ContainerProps) => {  
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-${size || 'sm'}`}>
      {children}
    </div>
  )
}
