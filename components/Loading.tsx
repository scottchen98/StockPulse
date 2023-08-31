import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Loader2 className="animate-spin" size={50} />
    </div>
  );
}
export default Loading;
