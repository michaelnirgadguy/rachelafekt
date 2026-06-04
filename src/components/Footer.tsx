import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-wide px-6 lg:px-20 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-heading text-lg text-foreground">רחל אפק</p>
          <p className="text-sm text-muted-foreground mt-1">
            מאמרי דעה על פוליטיקה, חברה ותרבות
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/archive" className="text-foreground/80 hover:text-primary">ארכיון</Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary">אודות</Link>
          <Link to="/contact" className="text-foreground/80 hover:text-primary">צרו קשר</Link>
          <a
            href="mailto:rchlafek@gmail.com"
            className="text-foreground/80 hover:text-primary"
          >
            rchlafek@gmail.com
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-wide px-6 lg:px-20 py-4 text-xs text-muted-foreground">
          © {year} רחל אפק. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
