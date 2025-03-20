import React from "react";
import { APP_NAME } from "@/lib/constants/constants";
import ModeToggle from "./mode-toggle";
import UserLogin from "./UserLogin";
import ShareButton from "./ShareButton"
import AiButton from "./AiButton";

function Header() {
  return (
    <>
      <div className="w-full h-[5rem] px-10 flex items-center justify-between border-b">
        <div>
          <h1 className="font-extrabold text-2xl">
            {APP_NAME}
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <AiButton />
          <ShareButton />
          <ModeToggle />
          <UserLogin />
        </div>
      </div>
    </>
  );
}

export default Header;
