const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col bg-gray-800 text-white text-xs gap-5 p-6">
        <div className="flex justify-center">
          <p className="text-center text-md">
            © 2024 RestoGest. Tous droits réservés.
          </p>
        </div>
        <div className="flex justify-center gap-10">
          <ul className="flex justify-between gap-10">
            <li>
              <a href="/privacy-policy">Politique de confidentialité</a>
            </li>
            <li>
              <a href="/terms-of-service">Conditions d'utilisation</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
