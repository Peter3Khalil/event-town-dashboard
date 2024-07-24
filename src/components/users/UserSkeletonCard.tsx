import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const UserSkeletonCard = () => {
  return (
    <Card className="w-full lg:w-[800px]">
      <CardHeader>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-12">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="size-[200px] rounded-full" />
          </div>
          <div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserSkeletonCard;
