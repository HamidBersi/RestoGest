import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="p-4 flex gap-2">
        <Button onClick={() => toast.success("OK !")}>Test</Button>
      </div>
    </>
  );
}
