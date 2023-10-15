import './Navbar.css'
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = (e) => {
        setIsOpen(false);
        // Check if we are on the home page
        if (location.pathname === '/') {
          // Prevent the default navigation
          e.preventDefault();
          
          // Find the target element
          const targetElement = document.getElementById('form');
          if (targetElement) {
            // Scroll to the target element
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // External navigation to /order
          window.location.href = '/order';
        }
      };
    
    useEffect(() => {
      // Handle scroll on direct navigation to an anchor
      if (location.hash === '#form') {
        const targetElement = document.getElementById('form');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [location]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const setFalse = () => {
        setIsOpen(false);
    }

    return (
        <nav className="navbar">
            <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-512%2Fmenu-1768000-1502336.png&f=1&nofb=1&ipt=615b66575e382cef9732e34a1c9995f4c6106686ae9ca31cc524d28a2531d190&ipo=images' className="menu-icon" onClick={handleToggle} />
            <Link to="/" onClick={setFalse}>
            <img src='logo.png' className="navbar-logo"></img>
            </Link>
            <ul className={`nav-list ${isOpen ? 'nav-active' : ''}`}>
                <li><Link onClick={handleToggle} to="/">Home</Link></li>
                <li><Link to={location.pathname === '/' ? '#target-section' : '/order'} onClick={handleLinkClick}>Order</Link></li>
                <li><Link onClick={handleToggle} to="/services">Services</Link></li>
                <li><Link onClick={handleToggle} to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
