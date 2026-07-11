import { MailTabs } from "@src/components/mail-tabs.tsx/mail-tabs";
import { ThemeButton } from "@src/components/theme-button/theme-button";

export const Navbar = () => {
  return (
    <nav>
      <section className="flex justify-between items-center">
        <MailTabs />
        <ThemeButton />
      </section>
      <section></section>
    </nav>
  );
};
