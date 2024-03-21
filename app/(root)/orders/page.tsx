import { getOrders } from "@/lib/actions/action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold my-10">Your Orders</p>
      {!orders ||
        (orders.length === 0 && (
          <p className="text-body-bold my-5">You have no orders yet.</p>
        ))}
      <div className="flex flex-col gap-10">
        {orders?.map((order: OrderType) => (
          <div className="flex flex-col gap-8 p-4 hover:bg-grey-1">
            <div className="flex gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-base-bold">Order ID: {order._id}</p>
              <p className="text-base-bold">
                Total Amount: ${order.totalAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;