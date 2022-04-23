import React from "react";
import Header from '../header';
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';
export default function Navbar() {
  const [scroll, setScroll] = React.useState(0);
  const [t, i18n] = useTranslation();
  const handleScroll = () => setScroll(document.documentElement.scrollTop);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = scroll > 90 ? "fixed-navbar animated fadeInDown active" : "fixed-navbar";

  return (
    <div className={className}>

      {/* {i18n.language === 'ar' &&
        <Helmet><link rel="stylesheet" type="text/css" href="/assets/arabicStyle/arabicStyle.css" /></Helmet>} */}

      <Header />
    </div>
  );
}