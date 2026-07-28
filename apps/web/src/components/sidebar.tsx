import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ProfilePicture } from "@src/components/profile-pic/profile-picture";
import { Inbox } from "@src/icons/inbox";
import { LogoutButton } from "@src/logout-button/logout-button";
import { useUserInfoStore } from "@src/zustand/user-info";

export const Sidebar = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const selectedEmailType = "primary-account";

  return (
    <aside className='flex flex-col pr-0 transition-colors delay-350 has-[>input:first-child:checked]:delay-0'>
      <input
        type='checkbox'
        id='drawer-toggle'
        className='peer'
        hidden
        defaultChecked={true}
      />
      <label
        htmlFor='drawer-toggle'
        className='peer-checked:bg-bg-secondary block cursor-pointer pb-6 transition-transform duration-300'>
        <HamburgerMenuIcon
          className='text-fg-primary'
          height={20}
          width={20}
        />
      </label>

      {/* sidebar contents */}
      <section
        id='sidebar-content-container'
        className='-mt-3 flex w-0 flex-1 flex-col overflow-hidden text-sm text-nowrap transition-[width] duration-300 peer-checked:w-64 peer-checked:overflow-visible'>
        {/* first container */}
        <section
          id='priamry-account-container'
          className='bg-bg-secondary space-y-2 p-2'>
          <div className='flex cursor-pointer items-center gap-2'>
            <Inbox className='cursor-pointer' />
            <span>All Inboxes</span>
          </div>
          <p className='z-10 text-[16px]'>Primary Account</p>
        </section>

        <section className='flex items-center'>
          {userInfo && <ProfilePicture userInfo={userInfo} />}
          <input
            hidden
            type='radio'
            id='primary-account'
            name='selected-email-type'
            className='peer'
            checked={selectedEmailType === "primary-account"}
          />
          <label
            className='peer-checked:bg-bg-primary! bg-bg-secondary block cursor-pointer space-y-2 p-2'
            htmlFor='primary-account'>
            <p>{userInfo?.name}</p>
            <p>{userInfo?.email}</p>
          </label>
        </section>

        <section
          id='footer'
          className='bg-bg-secondary flex flex-1 items-end p-2'>
          <LogoutButton />
        </section>
      </section>
    </aside>
  );
};
