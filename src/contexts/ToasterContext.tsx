import { createContext, ReactNode, useState } from "react";

export interface IToaster {
  type: string;
  message: string;
}

export interface IToasterState {
  toaster: IToaster;
  setToaster: (toaster: IToaster) => void;
}
export const defaultToaster = {
  type: "",
  message: "",
};

export const ToasterContext = createContext<IToasterState>({
  toaster: defaultToaster,
  setToaster: () => {},
});

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toaster, setToaster] = useState<IToaster>(defaultToaster);

  return (
    <ToasterContext.Provider value={{ toaster, setToaster }}>
      {children}
    </ToasterContext.Provider>
  );
};
