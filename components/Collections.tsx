import { getCollection } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const collections = await getCollection();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No Collections Found</p>
      ) : (
        <>
          <div className="flex items-center justify-center gap-8 ">
            {collections.map((collection: CollectionType) => (
              <Link href={`/collection/${collection._id}`} key={collection._id}>
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={350}
                  height={200}
                  className="rounded-lg cursor-pointer"
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Collections;
