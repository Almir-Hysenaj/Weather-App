import search_icon from '../assets/search.png';
import { useRef } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-between items-center gap-4 w-full bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="flex-1 h-12.5 border-none outline-none pl-6.25 text-white text-lg"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSearch((inputRef.current?.value || '').trim());
          }
        }}
      />
      {/* Search Icon Button */}
      <img
        src={search_icon}
        alt="search-icon"
        className="w-12.5 h-12.5 p-3.75 cursor-pointer hover:scale-110 ease-in-out transition-transform duration-200"
        onClick={() => {
          onSearch((inputRef.current?.value || '').trim());
        }}
      />
    </div>
  );
};
