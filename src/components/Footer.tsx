const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-6">
      <div className="container mx-auto text-center">
        <p className="font-heading text-lg font-bold text-primary mb-2">דן גיא</p>
        <p className="text-sm text-muted-foreground">
          פסיכולוג קליני מומחה · כל הזכויות שמורות © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
