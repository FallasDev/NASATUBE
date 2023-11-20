import { Link } from "react-router-dom"

export function Header({logo,search,sobreNosotros,className,navClass}){
    return (
        <header className={className}>
            <nav className={navClass}>
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
                {search}
                {sobreNosotros}
            </nav>
        </header>
    )
}