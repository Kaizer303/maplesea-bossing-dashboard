export default function Index() {
  return (
    <div className="bg-gray-950 h-screen w-full">
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        <div className="text-gray-200 text-3xl font-bold">
          <h1>Welcome to Maple Cash Application</h1>
        </div>
        <div className="p-4">
          <img
            className="h-auto w-auto rounded-3xl"
            alt="maple logo"
            src="maple-logo.webp"
          />
        </div>
      </div>
    </div>
  );
}
