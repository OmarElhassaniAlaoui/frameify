import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface LinkItem {
  label: string;
  url: string;
}

interface AvatarProps {
  avatar: string;
  name: string;
  links: LinkItem[];
}

const Avatar: React.FC<AvatarProps> = ({ avatar, name, links }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close if the Esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <section className=" py-20">
      <div className="container">
        <div className="flex justify-center">
          <div className="relative inline-block">
            <button
              ref={trigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-left"
              aria-label="Toggle dropdown"
            >
              <div className="relative mr-4 h-[60px] w-[60px] rounded-full">
                <Image
                  src={avatar}
                  alt="avatar"
                  className="h-full w-full rounded-full object-cover object-center"
                  width={42}
                  height={42}
                />
                <span className="absolute -right-0.5 -top-0.5 block h-[14px] w-[14px] rounded-full border-[2.3px] border-white bg-[#219653] dark:border-dark"></span>
              </div>
              <span className="text-base font-medium text-foreground">
                {name}
              </span>
              <span className="pl-[10px] text-foreground duration-100">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`fill-current ${
                    dropdownOpen ? "-scale-y-100" : ""
                  }`}
                >
                  <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4062 5.65625 17.6875 5.9375C17.9688 6.21875 17.9688 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1562 10.1875 14.25 10 14.25Z" />
                </svg>
              </span>
            </button>
            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              className={`absolute right-0 top-full z-40 w-[200px] space-y-1 rounded bg-card border-gray-400 dark:border-gray-800 border-2 p-2 shadow-card  ${
                dropdownOpen ? "block" : "hidden"
              }`}
              role="menu"
            >
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="block w-full rounded px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary dark:hover:bg-dark-3"
                  role="menuitem"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Avatar;