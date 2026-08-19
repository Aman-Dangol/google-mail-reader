import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { createContext, type ReactNode, useState, useEffect } from "react";

interface SelectedMailProps {
  selectedMail: Mail;
  selectedIndex: number;
}

export const MailContext = createContext<{
  selectedMailData?: SelectedMailProps;
  setSelectedMail: (props?: SelectedMailProps) => void;
}>({ setSelectedMail: () => {} });

export const MailProvider = ({
  children,
  mails,
}: {
  children: ReactNode;
  mails?: Mail[];
}) => {
  const [selectedMailData, setSelectedMail] = useState<SelectedMailProps>();

  useEffect(() => {
    if (!selectedMailData) return;
    if (!mails) return;

    const foundIndex = mails.findIndex(
      (m) => m.id === selectedMailData.selectedMail.id,
    );

    if (foundIndex === -1) {
      setSelectedMail(undefined);
      return;
    }

    const freshMail = mails[foundIndex];

    if (
      freshMail !== selectedMailData.selectedMail ||
      foundIndex !== selectedMailData.selectedIndex
    ) {
      setSelectedMail({ selectedMail: freshMail!, selectedIndex: foundIndex });
    }
  }, [mails, selectedMailData]);

  return (
    <MailContext.Provider value={{ setSelectedMail, selectedMailData }}>
      {children}
    </MailContext.Provider>
  );
};
