import { Link } from "react-router-dom";

interface NavLinkProps {
    href: string;
    as: string;
    children: React.ReactNode;
    info?: string;
}

export default function NavLink({ href, info, children }: NavLinkProps) {
    const path = window.location.pathname;
    return (
        <Link to={href} 
              className={`nav-link ${encodeURIComponent(path) === encodeURIComponent(href) ? 'active' : ''}`}>
            {children}
        </Link>
    )
}