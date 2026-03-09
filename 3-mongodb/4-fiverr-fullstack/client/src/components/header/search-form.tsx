import type { FC } from "react";
import { IoSearch } from "react-icons/io5";

const SearchForm: FC = () => {
  return (
    <form className="flex-1 flex border rounded overflow-hidden max-w-125 border-zinc-300 shadow-sm">
      <input type="text" name="search" placeholder="hizmet ara..." className="size-full px-3 py-1.5 outline-none" />

      <button type="submit" className="bg-black p-2 text-white text-xl max-sm:hidden">
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchForm;
