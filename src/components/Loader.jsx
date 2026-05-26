import { Card } from '@/components/common/Card';

function SkeletonCard() {
  return (
    <Card className="p-5 pl-6 overflow-hidden">
      <div className="skeleton h-5 w-16 mb-3" />
      <div className="skeleton h-[22px] w-4/5 mb-2" />
      <div className="skeleton h-[18px] w-[55%] mb-2" />
      <div className="skeleton h-4 w-[35%]" />
      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <div className="skeleton h-[34px] flex-1 rounded-md" />
        <div className="skeleton h-[34px] flex-1 rounded-md" />
      </div>
    </Card>);

}

export default function Loader({ count = 8 }) {
  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>);

}