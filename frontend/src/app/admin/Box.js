import { useState } from "react";
import "./Box.css"
import Link from 'next/link'
const Box = ({head,dest}) => {
    const [isHovered, setIsHovered] =  useState(false);
    

    const handleHover = () => {
        setIsHovered(!isHovered);
    };
    const handleExploreClick = () => {
        
    };
    const linkStyle = {
        
        textDecoration: 'none',
      };
    
    return (
        <div
          className={`boxa ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        
        >
          <h3 className={`hea ${isHovered ? 'hea-hovered' : ''}`}>{head}</h3>
          <Link href="http://localhost:3000/admin/doctorapps" style={linkStyle}
          className="box-button">Explore</Link>
        </div>
      );
};

export default Box;