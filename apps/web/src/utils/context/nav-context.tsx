import type { MailType } from "@repo/shared-types/utils/api-mail-types";
import { createContext, type ReactNode, useState } from "react";

export const NavContext = createContext<{
  currentTab: MailType;
  setCurrentTab: (tab: MailType) => void;
}>({
  currentTab: "Inbox",
  setCurrentTab: () => {},
});

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<MailType>("Inbox");

  return (
    <NavContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </NavContext.Provider>
  );
};
