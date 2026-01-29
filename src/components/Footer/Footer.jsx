import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        <p className="footer__author">Developed by Mona Abdelreheem</p>
        <p className="footer__year">{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
