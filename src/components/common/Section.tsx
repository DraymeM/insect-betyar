import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

interface SectionProps {
  title?: string;
  children: ReactNode; 
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
  return (
    <div className={`section mb-5 ${className || ''}`}>
        {title && <h2 className="text-center mb-4">{title}</h2>}
      <Container>
        {/* Section Title */}

        {/* Section Content */}
        {children}
      </Container>
    </div>
  );
};

export default Section;