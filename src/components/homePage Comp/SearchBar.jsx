"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";

import { Vazirmatn } from "next/font/google";
import GlowBackground from "../GlowBackground";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700"],
});
export default function SearchBar() {
  const [searchinput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();
  function getSmartResults(results) {
    if (!results || !Array.isArray(results)) return [];

    const roles = {
      investor: [],
      company: [],
      charityOrganization: [],
      supportOrganization: [],
    };

    results.forEach((item) => {
      if (roles[item.role]) {
        roles[item.role].push(item);
      }
    });

    const finalResults = [];

    finalResults.push(...roles.investor.slice(0, 2));

    const otherRoles = [
      "company",
      "charityOrganization",
      "supportOrganization",
    ];
    otherRoles.forEach((role) => {
      if (roles[role].length > 0) {
        finalResults.push(roles[role][0]);
      }
    });

    if (finalResults.length < 5) {
      const remaining = results.filter((item) => !finalResults.includes(item));
      finalResults.push(...remaining.slice(0, 5 - finalResults.length));
    }

    return finalResults;
  }

  useEffect(() => {
    if (searchinput.trim() === "") {
      setResults([]);
      return;
    }



    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://estethmarat-estethmarats-projects.vercel.app/api/v1/search?name=${searchinput}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data = await response.json();
        setLoading(false);
        setResults(data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchResults();
  }, [searchinput]);
  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div className="header-bg  relative"> 
      <div className="layer flex justify-center min-h-[100vh] items-center bg-black absolute bg-opacity-[.4] top-0 bottom-0 left-0 right-0">
        <div className="text-center w-full -translate-y-10 flex flex-col  justify-around  items-center">
          <h2 className="text-center  font-vazir text-white my-3  font-extrabold text-5xl">
            {" "}
            ابحث عن فرص استثمارية
          </h2>
          <h2 className="text-center  font-vazir text-white my-3  font-extralight text-5xl">
            تناسب <span className="text-[#00F560]">متطلباتك</span>
          </h2>

          <div className="xs:max-w-[450px] relative  w-full">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative  w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                autoComplete="off"
                style={{ direction: "rtl" }}
                type="search"
                id="default-search"
                className="block font-vazir w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-full bg-[#D9D9D9] focus:ring-blue-500 focus:border-blue-500"
                placeholder="ابحث هنا ..."
                value={searchinput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchinput != "" && router.push(`/search/${searchinput}`);
                  }
                }}
              />
              <button
                onClick={() => {
                  router.push(`/search/${encodeURIComponent(searchinput)}`);
                }}
                type="button"
                disabled={searchinput == ""}
                className="text-black  absolute start-2.5 top-1/2 -translate-y-1/2 bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
              >
                ابحث
              </button>
            </div>
            {/* الاقتراحات */}
            <div
              className={`px-5 left-1/2 z-10 ${searchinput == "" && "hidden"
                } -translate-x-1/2  w-full absolute xs:px-0`}
            >
              <div className="bg-[#D9D9D9C7] overflow-hidden rounded-xl bg-opacity-20 xs:max-w-[400px]  mx-auto w-full    ">
                <div style={{ direction: "rtl" }}>

                  {getSmartResults(results?.userResults).map((item, id) => (
                    <div
                      onClick={() => {
                        const id = item._id;
                        switch (item.role) {
                          case "investor":
                            router.push(`/investors/${id}`);
                            break;
                          case "company":
                            router.push(`/startUps/${id}`);
                            break;
                          case "charityOrganization":
                            router.push(`/charaties/${id}`);
                            break;
                          case "supportOrganization":
                            router.push(`/incubators/${id}`);
                            break;
                        }
                      }}
                      key={id}
                      className="flex justify-center items-center"
                    >
                      <div className="border-b border-gray-600 cursor-pointer w-full hover:bg-[#938f8fc7] xs:px-4 flex justify-center items-center">
                        <div className="w-1/6 xs:p-1">
                          <img
                            src={
                              item?.profilePhoto ||
                              item?.companyPhoto ||
                              item?.image?.secure_url
                            }
                            className="w-[50px] h-[50px]"
                            alt=""
                          />
                        </div>
                        <div className="w-5/12">
                          <p className="text-black font-semibold">
                            {item.fullEnglishName ||
                              item.companyName ||
                              item.name}
                          </p>
                        </div>
                        <div className="w-5/12">
                          <p className="text-black text-[16px]">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <Spinner color="info" aria-label="Info spinner example" />
                  )}
                  <p
                    onClick={() => {
                      router.push(`/search/${searchinput}`);
                    }}
                    className="pb-2 text-[#3A3A3A] cursor-pointer hover:text-[#00F560]"
                  >
                    عرض المزيد من النتائج ←
                  </p>
                </div>
              </div>
            </div>
            <p className="font-vazir text-3xl my-4 text-[#00F560] "> أو</p>
            <a
              href="#suggestions"
              className="text-white hover:text-black  block bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 hover:bg-[#38ba6c]    font-medium opacity-50 border border-[#38ba6c] cursor-pointer rounded-full text-lg py-3"
            >
              شاهد الاقتراحات
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

