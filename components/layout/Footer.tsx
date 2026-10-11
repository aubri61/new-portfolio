import { ArrowUp } from "lucide-react";
export default function Footer() {
  return (
    <footer className="footer">
      <a className="wordmark" href="#home">
        jueon<span className="blue">.</span>
      </a>
      <p>© 2026 Jueon Park. Built with care.</p>
      <a href="#home" className="back-top">
        Back to top <ArrowUp size={15} aria-hidden="true" />
      </a>
    </footer>
  );
}
