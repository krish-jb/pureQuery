import { NavLink } from "react-router-dom";

interface props {
  setHasFetched: (setTo: boolean) => void;
}

type LinkType = {
  url: string;
  text: string;
};

const links: LinkType[] = [
  { url: "/search", text: "🔭 All" },
  { url: "/news", text: "📰 News" },
  { url: "/images", text: "📷 Images" },
  { url: "/videos", text: "📽️ Videos" },
];

const Links = ({ setHasFetched }: props) => {
  setHasFetched(false);
  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {links.map(({ url, text }: LinkType, index: number) => (
        <NavLink
          key={index}
          to={url}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 border-b-2 dark:text-indigo-600 border-indigo-600 pb-2 mx-2"
              : "mx-2"
          }
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};

export default Links;
