import type { MailType } from "@repo/shared-types/utils/api-mail-types";
import { TabsRoot, TabsList, TabsTrigger } from "@src/components/Tabs/tabs";
import { NavContext } from "@src/utils/context/nav-context";
import { useContext } from "react";

export const MailTabs = () => {
  const navContext = useContext(NavContext);
  const defaultTab = navContext.currentTab ? navContext.currentTab : "Inbox";

  const handleTabChange = (tab: MailType) => {
    navContext.setCurrentTab(tab);
  };

  return (
    <TabsRoot defaultValue={defaultTab}>
      <TabsList>
        <TabsTrigger value="Inbox" onClick={() => handleTabChange("Inbox")}>
          Inbox
        </TabsTrigger>
        <TabsTrigger value="Sent" onClick={() => handleTabChange("Sent")}>
          Sent
        </TabsTrigger>
        <TabsTrigger value="Drafts" onClick={() => handleTabChange("Drafts")}>
          Drafts
        </TabsTrigger>
        <TabsTrigger value="Others" onClick={() => handleTabChange("All")}>
          All
        </TabsTrigger>
      </TabsList>
    </TabsRoot>
  );
};
