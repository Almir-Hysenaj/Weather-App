import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    const showTimer = setTimeout(() => setVisible(true), 0);
    const hideTimer = setTimeout(() => setVisible(false), 2000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [message]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div className=" bg-white/10 backdrop-blur-sm rounded-xl shadow-lg text-white px-4 py-2">
        {message}
      </div>
    </div>
  );
};
