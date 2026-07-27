import type { GoogleUser } from "@repo/shared-types/utils/user-info";

interface Props {
  userInfo: GoogleUser;
}

export const ProfilePicture = ({ userInfo }: Props) => {
  return (
    <section>
      <img
        src={userInfo.picture ?? ""}
        alt={userInfo.name ?? ""}
        className='size-10 rounded-full'
      />
    </section>
  );
};
