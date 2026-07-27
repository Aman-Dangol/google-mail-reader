import { MailTabs } from "@src/components/mail-tabs.tsx/mail-tabs";
import { ThemeButton } from "@src/components/theme-button/theme-button";

export const Navbar = () => {
  return (
    <nav>
      <section className='flex items-center justify-between'>
        <MailTabs />
        <ThemeButton />
      </section>
      <section></section>
    </nav>
  );
};
