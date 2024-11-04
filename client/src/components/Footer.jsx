import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <ul className="footer_categories">
        <li><Link to="/posts/categories/Agriculture">Agricultura</Link></li>
        <li><Link to="/posts/categories/Business">Negocios</Link></li>
        <li><Link to="/posts/categories/Education">Educacion</Link></li>
        <li><Link to="/posts/categories/Entertainment">Entretenimiento</Link></li>
        <li><Link to="/posts/categories/Art">Arte</Link></li>
        <li><Link to="/posts/categories/Investment">Investigacion</Link></li>
        <li><Link to="/posts/categories/Uncategorized">Sin Categoria</Link></li>
        <li><Link to="/posts/categories/Weather">Clima</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>Todos los Derechos Reservados &copy; Coptyright</small>
      </div>
    </footer>
  )
}

export default Footer