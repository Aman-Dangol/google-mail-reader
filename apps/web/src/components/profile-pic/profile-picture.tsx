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
        className="size-12 rounded-full"
      />
    </section>
  );
};
