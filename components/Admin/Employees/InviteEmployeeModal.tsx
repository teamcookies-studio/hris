import React, { useRef, useState } from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';
import { useOutsideClick } from '../../../context/useOutsideClick';

const InviteEmployeeModal = ({ showModal, setShowModal }) => {
  const inputEmailRef = useRef(null);
  const modalsRef = useRef(null);

  const [isLoading, setLoading] = useState(false);

  useOutsideClick(modalsRef, () => setShowModal(false));

  const handleSubmit = () => {
    setLoading(true);
    
    // supabase works here
    setTimeout(() => {
      setLoading(false);
      setShowModal(false);
    }, 2000);
  };

  const handleClose = () => setShowModal(false);
  if (!showModal) return null;
  return (
    <>
      <div
        className={cx(styles.InviteEmployeeModal__wrapper, "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none")}
      >
        <div ref={modalsRef} className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className={cx(styles.InviteEmployeeModal__formWrapper, "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none")}>
            <div className={cx(styles.InviteEmployeeModal__formHeader, "flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t")}>
              <h2 className="font-semibold">
                Invite Employee
              </h2>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={handleClose}
                disabled={isLoading}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  &#10006;
                </span>
              </button>
            </div>
            <div className={cx(styles.InviteEmployeeModal__formInput, "relative p-6 flex-auto")}>
              <input
                ref={inputEmailRef}
                type="email"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Email"
              />
            </div>
            <div className={cx(styles.InviteEmployeeModal__formAction, "flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b")}>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="text-emerald-500 active:text-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Invite Employee
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default InviteEmployeeModal