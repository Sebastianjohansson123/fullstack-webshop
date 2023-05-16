
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


// This code scrolls to the top of the page when the user navigates to a new page
// The code is used in the App.js file

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;