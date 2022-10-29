import { XCircleIcon } from "@heroicons/react/20/solid";

export default function Me() {
  return (
    <div className="h-screen bg-my-terminal-background bg-cover bg-center grid grid-cols-2">
      <div className="flex justify-center items-center mx-auto h-3/6">
        <XCircleIcon className="w-4 h-4 inline-block" />
      </div>
      <div className="flex justify-center items-center mx-auto h-3/6">
        <XCircleIcon className="w-4 h-4 inline-block" />
      </div>
    </div>
  );
}
