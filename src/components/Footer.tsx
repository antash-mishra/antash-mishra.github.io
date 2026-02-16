import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ind-border bg-gray-900 text-ind-text-dim py-6">
      <div className="container mx-auto px-6 flex justify-between items-center font-mono text-xs">
        <span>&copy; {currentYear} Antash Mishra</span>
        <span>built with code</span>
      </div>
    </footer>
  );
};

export default Footer;
