"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Suspense } from "react";

function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <div>
      <input
        className="mx-auto flex mt-4 input input-bordered rounded-full w-24 md:w-auto"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString() || ""}
      />
    </div>
  );
}

export default function Searchbar({ placeholder }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search placeholder={placeholder} />
    </Suspense>
  );
}
