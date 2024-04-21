import React, { useState } from 'react';
import { Context } from '@/contexts/Context';

type props = {
  children: React.ReactNode | React.ReactNode[];
};

const ConfigProvider = ({ children }: props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [projectFilterTag, setProjectFilterTag] = useState('');

  return (
    <Context.Provider
      value={{
        isNavOpen,
        setIsNavOpen,
        projectFilterTag,
        setProjectFilterTag
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ConfigProvider;
