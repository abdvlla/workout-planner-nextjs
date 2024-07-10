"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const UserProfile = () => {
  const [user, setUser] = useState("");

  return (
    <div tabIndex={0} role="button">
      <div tabIndex={0} role="button">
        {user ? (
          <div>
            <div className="w-10 rounded-full btn btn-ghost btn-circle avatar">
              <Image
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                width={100}
                height={10}
                priority={true}
              />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link href={"/profile/settings"}>Settings</Link>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link href={"/login"} className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
