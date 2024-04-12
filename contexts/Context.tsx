import React from "react";

type ContextType = {
  isNavOpen: boolean;
  setIsNavOpen: (value: boolean) => void;
  projectFilterTag: string;
  setProjectFilterTag: (value: string) => void;
  settingsData: any;
};

// create the context with default value
export const Context = React.createContext<ContextType>({
  isNavOpen: false,
  setIsNavOpen: () => {},
  projectFilterTag: "",
  setProjectFilterTag: () => {},
  settingsData: null,
});
