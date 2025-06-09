import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/booking">Book Now</Link>
            <Link to="/login">Login</Link>
            {/* Add conditional links for dashboards based on user role */}
        </nav>
    );
}
export default Navbar;
