export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white gap-4">
      <h2 className="text-xl font-semibold">
        Something went wrong 😕
      </h2>

      <button
        onClick={onRetry}
        className="bg-purple-600 px-5 py-2 rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}