import { getSubscriptionsService } from "@/db/service/subscription-service";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import LogoutButton from "./LogoutButton";

const ProfileCards = async () => {
  const response = await getSubscriptionsService();

  if (!response?.data) {
    return null;
  }

  const { subs, email } = response.data;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between rounded-lg bg-background p-6 shadow-md">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{email}</h2>
          </div>
        </div>
        <LogoutButton />
      </div>
      <div className="flex flex-col items-center gap-6">
        {subs.map((sub) => (
          <div className="flex flex-col gap-4" key={sub.id}>
            <Separator />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-lg bg-background p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold">
                  Subscription Details
                </h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Plan:</span>
                    <span>{sub.plan}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span>${sub.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Purchased:</span>
                    <span>
                      {format(new Date(sub.created_at!), "LLL dd, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold">
                  Billing Information
                </h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span>{sub.order_id}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{sub.full_name}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{sub.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Payment Method:
                    </span>
                    <span>PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCards;
