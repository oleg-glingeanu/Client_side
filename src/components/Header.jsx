import logo from './assets/logo.png'

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4'>
        <div className='container'>
            <a className='navbar-brand' href='/'>
                <div className='d-flex'>
                    <img src={logo} alt='logo' className='mr-2'/>
                    <a href={`home/`} className="text-primary">MGMT</a>
                </div>
            </a>
        </div>
    </nav>
  )
}
