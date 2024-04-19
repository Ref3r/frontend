"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDynamicContext } from "@/lib/dynamic"
import { useIsAuthenticated } from "@/hooks/test";
import { useRouter } from "next/navigation";
import appwriteService from "@/appwrite/config";


import {
  useBrandData,
  usePublicKey,
  useInfluencerData,
  useIsInfluencer,
} from "@/store";
import { useUserActions } from "@/hooks/useUserActions";

function LandingNavbar() {
  const [Toggle, setToggle] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, setShowAuthFlow, handleLogOut } =
    useDynamicContext();
  const { checkUserExist, checkUserSetup } = useUserActions();
  const userAuthenticated = useIsAuthenticated()
  console.log("is user authenticated", userAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      console.log("user payload data", user?.email);

      usePublicKey.setState({ publicKey: user?.email });
      const key = usePublicKey.getState().publicKey;
      console.log(key);

      const userCheck = async () => {
        console.log("key being added", key);
        const user = await checkUserExist(key);
        const setup = await checkUserSetup(key);
        console.log(user);
        console.log(setup);
        if (user) {
          router.push("/dashboard");
        }
      };

      userCheck();
    }
  }, [isAuthenticated]);

  const myLoader = () => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName}`;
  };

  const handleClick = () => {
    setToggle(!Toggle);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <nav className="z-10 md:bg-[#4A4A4A] mt-2 md:mt-10 w-[90%] rounded-md items-center justify-between text-[0.75rem] lg:text-sm font-semibold text-white flex">
        <Link href="/" className="md:w-[10%]">
          <Image
            src="/refer-logo.png"
            width="252"
            height="300"
            className="w-[70%] md:w-[60%] md:ml-4 my-2"
            alt="Ref3r logo"
          />
        </Link>

        <div className="md:flex w-[90%] justify-evenly items-center hidden">
          <div className="flex gap-[2rem] justify-center items-center w-[80%]">
            <Link href="/">
              <p className="hoverUnderline hover:text-[#00B24F]">Home</p>
            </Link>

            <Link
              // target="_blank"
              href="/"
            >
              <p className="hoverUnderline hover:text-[#00B24F]">Benefits</p>
            </Link>

            <Link href="/">
              <p className="hoverUnderline hover:text-[#00B24F]">
                What we offer
              </p>
            </Link>

            <Link href="/">
              <p className="hoverUnderline hover:text-[#00B24F]">
                How it works
              </p>
            </Link>

            <Link href="/">
              <p className="hoverUnderline hover:text-[#00B24F]">
                Testimonials
              </p>
            </Link>

            <Link href="/">
              <p className="hoverUnderline hover:text-[#00B24F]">Contact us</p>
            </Link>
          </div>

          <div className="mr-4">
            {/* <DynamicWidget /> */}
            {/* <DynamicConnectButton> {isAuthenticated ? 'logout' : 'login'}</DynamicConnectButton> */}
            {isAuthenticated ? (
              <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="relative cursor-pointer"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:underline">
                  <Image
                    loader={myLoader}
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName}`}
                    className="w-10 h-10 rounded-full"
                    width={10}
                    height={10}
                    alt=""
                  />
                </div>
                <div
                  className={
                    isOpen
                      ? "d-block absolute z-40 flex flex-col h-auto text-sm text-black bg-[#545454] rounded-md right-3 top-7 drop-shadow-md w-52 bg-dblu11 text-white "
                      : "hidden"
                  }
                >
                  <div className="flex items-center p-3 border-b-2 border-b-[#00B24F] justify-left">
                    <Image
                      loader={myLoader}
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName}`}
                      width={10}
                      height={10}
                      alt=""
                      className="w-8 rounded-full"
                    />
                    <p className="pl-2 text-[17px] font-semibold">
                      {user?.firstName}
                    </p>
                  </div>
                  <Link href="/">
                    <div className="flex items-center p-4 hover:bg-[#6E6E6E] justify-left">
                      <div className="pr-2">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_263_439)">
                            <path
                              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_263_439">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>

                      <p className="pl-2 text-left">Settings</p>
                    </div>
                  </Link>
                  <hr />
                  <button
                    className="w-full hover:bg-[#6E6E6E]"
                    onClick={() => handleLogOut()}
                  >
                    <div className="flex items-center p-4 justify-left w-full hover:bg-[#6E6E6E]">
                      <div className="pr-2">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16 17L21 12L16 7"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21 12H9"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="pl-2 text-left">Logout</p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="border px-6 py-2 rounded hover:bg-white hover:text-black"
                onClick={() => setShowAuthFlow(true)}
              >
                Login
              </button>
            )}
          </div>

          {Toggle ? (
            <Image
              src="/small.svg"
              alt="menu"
              width="65"
              height="30"
              className="z-0 md:hidden"
              onClick={handleClick}
            />
          ) : (
            <Image
              src="/close.png"
              alt="close"
              width="20"
              height="30"
              className="z-0 md:hidden"
              onClick={handleClick}
            />
          )}

          <div
            className={`delay-300 md:hidden text-center flex justify-center items-center gap-8 py-12 h-screen bg-black/70 w-full fixed top-[55px] text-white flex-col ${
              Toggle ? "right-[100%]" : "left-[100%]}"
            }`}
          >
            <div className="flex flex-col gap-[2rem]  w-[80%]">
              <Link href="/">
                <p className="hoverUnderline hover:text-[#00B24F]">Home</p>
              </Link>

              <Link
                // target="_blank"
                href="/"
              >
                <p className="hoverUnderline hover:text-[#00B24F]">Benefits</p>
              </Link>

              <Link href="/">
                <p className="hoverUnderline hover:text-[#00B24F]">
                  What we offer
                </p>
              </Link>

              <Link href="/">
                <p className="hoverUnderline hover:text-[#00B24F]">
                  How it works
                </p>
              </Link>

              <Link href="/">
                <p className="hoverUnderline hover:text-[#00B24F]">
                  Testimonials
                </p>
              </Link>

              <Link href="/">
                <p className="hoverUnderline hover:text-[#00B24F]">
                  Contact us
                </p>
              </Link>
            </div>

            <div className="md:mr-4">icon</div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LandingNavbar;
