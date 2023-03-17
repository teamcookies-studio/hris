import React, { useEffect, useRef, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { authRepository } from "../../modules/auth/auth.repository";

const UserDropdown = () => {
  const supabase = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownPopoverShow(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    await authRepository.signOut(supabase);
    setIsLoading(false);
  }

  return (
    <div className="relative">
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/team-1-800x800.jpg"
            />
          </span>
        </div>
      </a>
      <div
        ref={dropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 right-0 top-48"
        }
      >
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" /> */}
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-500 hover:text-blueGray-700"
          }
          onClick={signOut}
        >
          {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Logout"}
        </a>
      </div>
    </div>
  );
};

export default UserDropdown;
