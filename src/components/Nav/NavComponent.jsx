import './NavComponent.css'

export default function Nav() {
    return (
        <nav className="nav">
            <image className='site-logo'></image>
            <input type="checkbox" id="active" />
            <label for="active" className="menu-btn"><span></span></label>
            <label for="active" className="close-btn"></label>
            <div class="wrapper">
            <ul>
                <li><a href="https://nokerr21.github.io/nfcontrol/">Manual</a></li>
                <li><a href="https://nokerr21.github.io/nfcontrol/">About</a></li>
                <li><a href='https://nokerr21.github.io/nfcontrol/'>Contact</a></li>
            </ul>
            </div>
        </nav>
    );
}