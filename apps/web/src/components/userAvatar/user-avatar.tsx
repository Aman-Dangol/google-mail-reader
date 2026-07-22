import { getInitials } from "@src/utils/helpers/get-initials";

interface Props {
  name: string;
}

export const UserAvatar = ({ name }: Props) => {
  const initials = getInitials(name);

  return (
    <section className="rounded-full p-4 bg-bg-secondary/85  size-4 flex items-center justify-center ">
      {initials}
    </section>
  );
};
