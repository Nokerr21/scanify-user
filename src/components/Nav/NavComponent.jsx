import './NavComponent.css'

export default function Nav() {
    
    function setDarkMode(){
        document.querySelector('body').setAttribute('theme', 'dark');
        localStorage.setItem('selectedTheme', 'dark');
    }

    function setLightMode(){
        document.querySelector('body').setAttribute('theme', 'light');
        localStorage.setItem('selectedTheme', 'light');
    }

    const toggleTheme = (e) => {
        if (e.target.checked) {
            setLightMode()
        }
        else {
            setDarkMode()
        }
    }

    const selectedTheme = localStorage.getItem('selectedTheme');

    if (selectedTheme === 'light') {
        setLightMode();
    }

    return (
        <nav className="nav">
            <image className='site-logo'></image>
            <input onChange={toggleTheme} className='checkbox-theme' type="checkbox" defaultChecked={selectedTheme === 'light'} />
            <label className="checkbox-theme-label">
                <svg className='sun-icon' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='sun-icon-color' d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" fill="#1C274C"/>
                    <path className='sun-icon-color' fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861ZM19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM18.1476 18.1476C18.4405 17.8547 18.9154 17.8547 19.2083 18.1476L19.6011 18.5405C19.894 18.8334 19.894 19.3082 19.6011 19.6011C19.3082 19.894 18.8334 19.894 18.5405 19.6011L18.1476 19.2083C17.8547 18.9154 17.8547 18.4405 18.1476 18.1476ZM5.85211 18.1479C6.145 18.4408 6.145 18.9157 5.85211 19.2086L5.45927 19.6014C5.16638 19.8943 4.6915 19.8943 4.39861 19.6014C4.10572 19.3085 4.10572 18.8336 4.39861 18.5407L4.79145 18.1479C5.08434 17.855 5.55921 17.855 5.85211 18.1479ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z" fill="#1C274C"/>
                </svg>
                <svg className='moon-icon' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='moon-icon-color' d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1C274C"/>
                </svg>
            </label>
            <input className='chbox' type="checkbox" id="active" />
            <label htmlFor="active" className="menu-btn"><span></span></label>
            <label htmlFor="active" className="close-btn"></label>
            <div className="wrapper">
                <ul>
                    <li><a href="https://nokerr21.github.io/nfcontrol/">Manual</a></li>
                    <li><a href="https://nokerr21.github.io/nfcontrol/">About</a></li>
                    <li><a href='https://nokerr21.github.io/nfcontrol/'>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}