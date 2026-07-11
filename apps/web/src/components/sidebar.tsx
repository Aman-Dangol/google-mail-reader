import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Inbox } from "@src/icons/inbox";
import { useUserInfoStore } from "@src/zustand/user-info";

export const Sidebar = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const selectedEmailType = "primary-account";

  return (
    <aside className=" pr-0  flex flex-col has-[>input:first-child:checked]:delay-0 delay-350 transition-colors ">
      <input
        type="checkbox"
        id="drawer-toggle"
        className="peer"
        hidden
        defaultChecked={true}
      />
      <label
        htmlFor="drawer-toggle"
        className=" cursor-pointer block  pb-6  transition-transform duration-300 peer-checked:bg-bg-secondary"
      >
        <HamburgerMenuIcon className="text-fg-primary" height={20} width={20} />
      </label>

      {/* sidebar contents */}
      <section
        id="sidebar-content-container"
        className="peer-checked:overflow-visible flex flex-col flex-1   overflow-hidden -mt-3 text-sm text-nowrap  w-0 transition-[width] duration-300 peer-checked:w-64 "
      >
        {/* first container */}
        <section
          id="priamry-account-container"
          className=" bg-bg-secondary p-2 space-y-2 "
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <Inbox className="cursor-pointer  " />
            <span>All Inboxes</span>
          </div>
          <p className="text-[16px] z-10 ">Primary Account</p>
        </section>

        <section className="">
          <input
            hidden
            type="radio"
            id="primary-account"
            name="selected-email-type"
            className="peer"
            checked={selectedEmailType === "primary-account"}
          />
          <label
            className="peer-checked:bg-bg-primary! p-2 space-y-2 bg-bg-secondary block cursor-pointer"
            htmlFor="primary-account"
          >
            <p>{userInfo?.name}</p>
            <p>{userInfo?.email}</p>
          </label>
        </section>

        <section id="footer" className="flex-1 bg-bg-secondary" />
      </section>
    </aside>
  );
};
