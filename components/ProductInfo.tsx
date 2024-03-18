"use client";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
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
      setIsLiked(data.wishlist.includes(productInfo._id));
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

  const handleLike = async () => {
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({
            productId: productInfo._id,
          }),
        });

        const updatedUser = await res.json();
        setSignedInUser(updatedUser);
        setIsLiked(updatedUser.wishlist.includes(productInfo._id));
      }
    } catch (err) {
      console.log("[wishlist_POST]", err);
    }
  };

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <button onClick={handleLike} type="button">
          <Heart fill={isLiked ? `red` : "white"} />
          {""}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
