import React, { FC } from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

interface ModalsProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  cancelText?: string;
  submitText?: string;
  handleClose: () => void;
  handleDelete: () => void;
}

const Modals: FC<ModalsProps> = ({
  title = 'Modals',
  description = 'Description of Modals',
  cancelText = 'Cancel',
  submitText = 'Submit',
  handleClose,
  handleDelete
}) => {
  return (
    <>
      <div
        className={cx(styles.Modals__wrapper, "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none")}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className={cx(styles.Modals__formWrapper, "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none")}>
            <div className={cx(styles.Modals__formHeader, "flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t")}>
              <h2 className="font-semibold">
                {title}
              </h2>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={handleClose}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  &#10006;
                </span>
              </button>
            </div>
            <div className={cx(styles.Modals__formInput, "relative p-6 flex-auto")}>
              {description}
              {/* <div>Do You Want To Delete ?</div> */}
            </div>
            <div className={cx(styles.Modals__formAction, "flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b")}>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleClose}
              >
                {cancelText}
              </button>
              <button
                className="text-emerald-500 active:text-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleDelete}
              >
                {submitText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default Modals