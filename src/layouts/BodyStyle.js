// BodyStyle.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function BodyStyle({ className }) {
  const location = useLocation();

  useEffect(() => {
    // Add the class to the body element when the component mounts
    document.body.classList.add(className);

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);

  // Return null since this component doesn't render anything
  return null;
}

export default BodyStyle;
