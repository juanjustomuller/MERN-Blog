import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <ul className="footer_categories">
        <li><Link to="/posts/categories/Agricultura">Agricultura</Link></li>
        <li><Link to="/posts/categories/Negocios">Negocios</Link></li>
        <li><Link to="/posts/categories/Educación">Educación</Link></li>
        <li><Link to="/posts/categories/Entretenimiento">Entretenimiento</Link></li>
        <li><Link to="/posts/categories/Arte">Arte</Link></li>
        <li><Link to="/posts/categories/Investigacion">Investigacion</Link></li>
        <li><Link to="/posts/categories/SinCategoria">Sin Categoria</Link></li>
        <li><Link to="/posts/categories/Clima">Clima</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>Todos los Derechos Reservados &copy; Coptyright</small>
      </div>
    </footer>
  )
}

export default Footer