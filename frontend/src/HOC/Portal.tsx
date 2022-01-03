import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, modal }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        children,
        document.querySelector(`#${modal}`) as HTMLDivElement
      )
    : null;
};

export default Portal;
