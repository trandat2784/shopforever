import React from "react";
import SideBar from "../../component/SideBar";
import { assets } from "../../assets/frontend_assets/assets";
const Skin = () => {
  return (
    <div className="flex gap-5">
      <SideBar />
      <div className="mt-4 flex-1  ">
        <div className="border-2 grid lg:grid-cols-[1fr_3fr]  gap-4 p-4 mb-2">
          <img
            className="w-full h-auto object-cover"
            src={assets.about_img}
            alt=""
          />
          <div>
            <h1 className="m-0 text-xl font-bold">
              GenZ đã cưới thì chọn kiểu tóc cũng nhiều “chiêu” phết bao gồm cả
              tôi
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skin;
