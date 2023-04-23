import Search from '../Navigation/search';

/**
 * @description contains the search as well as the header component for the project title
 * @returns Header component
 */
const Header = () => {
    return ( 
        <header id="header">
            <h1>Pseudo Forum</h1>
            <Search/>
        </header>
    );
}
 
export default Header;