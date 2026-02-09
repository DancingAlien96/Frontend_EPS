export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-visual-top" />
      <div className="footer-content-inner">
        <div className="footer-left">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <img src="/logo.png" alt="Logo" style={{ width: 64, height: 64, objectFit: 'contain' }} />
            <div>
              <h3 className="font-serif">Sistema de Emprendedores</h3>
              <p className="muted">Ministerio de Economía • Chiquimula</p>
            </div>
          </div>
          <p className="muted" style={{ marginTop: 12, maxWidth: 360 }}>Apoyando el crecimiento de emprendedores locales con capacitación, financiamiento y asesoría.</p>
        </div>

        <div className="footer-mid">
          <h3 className="font-serif">Contacto</h3>
          <p className="muted">📞 Línea gratuita: <strong>1500</strong></p>
          <p className="muted">📧 <a href="mailto:info@mineco.gob.gt">info@mineco.gob.gt</a></p>
          <p className="muted">📍 Chiquimula, Guatemala</p>
        </div>

        <div className="footer-links-col">
          <h3 className="font-serif">Enlaces</h3>
          <ul className="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/noticias">Noticias</a></li>
            <li><a href="/programas">Programas</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h3 className="font-serif">Síguenos</h3>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <a href="#" aria-label="Facebook" className="social">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.84 3.44 8.84 8 9.8v-6.93H7.5V12H10V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.76-1.6 1.54V12h2.8l-.45 2.87H13.2v6.93c4.56-.96 8-4.96 8-9.8z" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="social">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 5.92c-.63.28-1.3.47-2 .56.72-.43 1.27-1.1 1.53-1.9-.68.4-1.44.68-2.25.84C18.5 4.5 17.6 4 16.6 4c-1.78 0-3.22 1.44-3.22 3.22 0 .25.03.5.08.73C10 7.78 6.48 6.1 4 3.1c-.27.48-.42 1.03-.42 1.62 0 1.12.57 2.1 1.44 2.68-.53-.02-1.03-.16-1.46-.4v.04c0 1.56 1.1 2.86 2.56 3.16-.27.07-.56.11-.85.11-.21 0-.41-.02-.61-.06.41 1.28 1.6 2.21 3.01 2.24C7.1 17.1 5.3 17.83 3.3 17.83c-.34 0-.68-.02-1.01-.06C1.95 19.02 3.37 20 5.04 20c6.04 0 9.35-5 9.35-9.35v-.43c.66-.48 1.24-1.08 1.7-1.77-.6.27-1.24.46-1.9.55z" fill="currentColor"/></svg>
            </a>
          </div>
          <div style={{ marginTop: 12 }}>
            <a href="/" className="btn-cta rounded-2xl">Contáctanos</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <small>© {new Date().getFullYear()} Ministerio de Economía - Sistema de Emprendedores</small>
        </div>
      </div>
    </footer>
  );
}
