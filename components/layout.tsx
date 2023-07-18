import React from 'react';

type ContainerProps = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Container = ({ children, size }: ContainerProps) => {  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size || 'sm']}`}>
      {children}
    </div>
  )
}
