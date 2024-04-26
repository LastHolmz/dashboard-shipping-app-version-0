import { Card, CardHeader } from "@/components/ui/card";
import formatDate from "@/lib/date";
import { getAssembleRequests } from "@/prisma/seed";

const AssembleRequestsPage = async () => {
  const requests = await getAssembleRequests();
  return (
    <div>
      {requests?.map((req, index) => {
        return (
          <Card key={index}>
            <CardHeader>
              <div className="flex flex-col gap-2">
                <div> الايدي : {req.id}</div>
                <div>
                  {" "}
                  الوقت : {formatDate(req.createdAt, "YYYY-MM-DD HH:mm:ss")}
                </div>
                <div> الايدي : {req.status}</div>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};

export default AssembleRequestsPage;
