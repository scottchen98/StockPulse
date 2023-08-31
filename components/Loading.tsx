import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="mt-20 md:fixed md:inset-0 md:flex md:items-center md:justify-center">
      <Loader2 className="mx-auto animate-spin" size={50} />
    </div>
  );
}
export default Loading;
