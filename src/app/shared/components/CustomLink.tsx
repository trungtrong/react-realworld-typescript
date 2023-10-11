import React from "react";
import { Link } from "react-router-dom";

interface CustomLinkProps {
    href: string;
    as: string;
    className?: string;
    children: React.ReactNode;
}

const CustomLink = ({ className, href, as, children }: CustomLinkProps) => {
    return (
        <Link to={href} 
              className={className || ""}>
            {children}
        </Link>
    )
}

export default CustomLink;

