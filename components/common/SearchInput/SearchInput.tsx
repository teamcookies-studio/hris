import React from 'react';

const SearchInput = () => {
  return (
    <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
      <div className="relative flex w-full flex-wrap items-stretch">
        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          placeholder="Search here..."
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
        />
      </div>
    </form>
  );
};

export default SearchInput;
