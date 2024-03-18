"use client";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HeartFavourite = ({ product }: { product: ProductType }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);

  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({
            productId: product._id,
          }),
        });

        const updatedUser = await res.json();
        setSignedInUser(updatedUser);
        setIsLiked(updatedUser.wishlist.includes(product._id));
      }
    } catch (err) {
      console.log("[wishlist_POST]", err);
    }
  };
  return (
    <button onClick={handleLike}>
      <Heart fill={isLiked ? `red` : "white"} />
      {""}
    </button>
  );
};

export default HeartFavourite;
