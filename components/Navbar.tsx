"use client";
import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUser();

  const router = useRouter();

  const [dropdownMenu, setDropdownMenu] = useState(false);

  const [query, setQuery] = useState("");

  const cart = useCart();

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href={"/"}>
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>
      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link href={"/"} className="hover:text-gray-600">
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className="hover:text-gray-600"
        >
          WishList
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className="hover:text-gray-600"
        >
          Orders
        </Link>
      </div>
      <div className="flex gap-3 border borer-grey-2 px-3 py-1 items-center rounded-lg">
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none max-sm:max-w-[120px]"
          type="text"
        />
        <button
          type="button"
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-blue-500" />
          {""}
        </button>
      </div>
      <div className="relative flex gap-3 items-center">
        <Link
          href={"/cart"}
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart({cart.cartItems.length})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute flex flex-col top-12 right-5 gap-3 p-5 rounded-lg border bg-white text-base-bold lg:hidden">
            <Link href={"/"} className="hover:text-gray-400">
              Home
            </Link>
            <Link href={"/wishlist"} className="hover:text-gray-400">
              Wishlist
            </Link>
            <Link href={"/orders"} className="hover:text-gray-400">
              Orders
            </Link>
            <Link
              href={"/cart"}
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart({cart.cartItems.length})</p>
            </Link>
          </div>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href={"/sign-in"}>
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
