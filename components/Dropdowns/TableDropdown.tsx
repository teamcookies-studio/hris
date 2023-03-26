/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useRef, useState } from "react";

interface NotificationDropdownProps {
  handleView: (id: string) => void,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  id: string,
}

const NotificationDropdown: FC<NotificationDropdownProps> = ({
  handleView,
  handleEdit,
  handleDelete,
  id,
}) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const dropdownRef = useRef(null);

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
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={dropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 right-2-rem"
        }
      >
        <a
          className={
            "cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blueGray-800"
          }
          onClick={() => {
            handleView?.(id)
            setDropdownPopoverShow(false)
          }}
        >
          View
        </a>
        <a
          className={
            "cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => {
            handleEdit?.(id)
            setDropdownPopoverShow(false)
          }}
        >
          Edit
        </a>
        <a
          className={
            "cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => {
            handleDelete?.(id)
            setDropdownPopoverShow(false)
          }}
        >
          Delete
        </a>
        {/* <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a> */}
      </div>
    </>
  );
};

export default NotificationDropdown;
