import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { createContext, type ReactNode, useState } from "react";

interface SelectedMailProps {
  selectedMail: Mail;
  selectedIndex: number;
}

export const MailContext = createContext<{
  selectedMailData?: SelectedMailProps;
  setSelectedMail: (props: SelectedMailProps) => void;
}>({ setSelectedMail: () => {} });

export const MailProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMailData, setSelectedMail] = useState<SelectedMailProps>();

  return (
    <MailContext.Provider value={{ setSelectedMail, selectedMailData }}>
      {children}
    </MailContext.Provider>
  );
};
