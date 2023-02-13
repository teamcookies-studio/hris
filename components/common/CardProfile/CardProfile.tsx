import React from "react";

export default function CardProfile({
  OnClick,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-3">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src="/img/team-1-800x800.jpg"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 max-w-150-px"
                />
              </div>
              <button
                className="absolute bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                style={{ right: 28, top: 28 }}
                onClick={OnClick}
              >
                Edit
              </button>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex-col justify-center py-4 lg:pt-4 pt-8">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  Muhammad Aryandi
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  Software Engineer (Frontend)
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 md:text-center">
            <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
              <h4 className="text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                Nama Panggilan
              </h4>
              <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
                Aryandi
              </div>
            </div>
            <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
              <h4 className="text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                Jenis Kelamin
              </h4>
              <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
                Laki-laki
              </div>
            </div>
            <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
              <h4 className="text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                Telepon
              </h4>
              <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
                +62 080989999
              </div>
            </div>
            <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
              <h4 className="text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                Email Pribadi
              </h4>
              <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
                testing123@gmail.com
              </div>
            </div>
            <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
              <h4 className="text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                Email Kantor
              </h4>
              <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
                aryandi_ganteng99@teamcookies.studio
              </div>
            </div>
            <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
              <h4 className="text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                Join Date
              </h4>
              <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
                03 Febuari 2019
              </div>
            </div>
            <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
              <h4 className="text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                Jumlah Anak
              </h4>
              <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
                0
              </div>
            </div>
            <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
              <h4 className="text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                Status Pernikahan
              </h4>
              <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
                Sudah Menikah
              </div>
            </div>
            <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
              <h4 className="text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                Alamat
              </h4>
              <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
                Jl. Dg Ramang. Perumahan Permata Sudiang Raya.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
