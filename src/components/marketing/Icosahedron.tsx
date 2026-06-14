import React from 'react';

interface IcosahedronProps {
  className?: string;
}

const Icosahedron: React.FC<IcosahedronProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Outer shell */}
      <path d="M50 2L95 25V75L50 98L5 75V25L50 2Z" stroke="currentColor" strokeWidth="1" />
      
      {/* Internal wireframe lines */}
      <path d="M50 2L50 35" stroke="currentColor" strokeWidth="1" />
      <path d="M50 35L95 25" stroke="currentColor" strokeWidth="1" />
      <path d="M50 35L95 75" stroke="currentColor" strokeWidth="1" />
      <path d="M50 35L50 98" stroke="currentColor" strokeWidth="1" />
      <path d="M50 35L5 75" stroke="currentColor" strokeWidth="1" />
      <path d="M50 35L5 25" stroke="currentColor" strokeWidth="1" />
      
      {/* Central triangle facets */}
      <path d="M95 25L50 65L5 25" stroke="currentColor" strokeWidth="1" />
      <path d="M95 75L50 65L5 75" stroke="currentColor" strokeWidth="1" />
      <path d="M50 65L50 98" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
};

export default Icosahedron;
