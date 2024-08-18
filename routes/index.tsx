import ItemList from "../islands/ItemList.tsx";

export default function Home() {
  return (
    <div>
      <div class="px-4 py-8 mx-auto bg-[#26efac] rounded-2xl">
        <div class="lg:container max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/MapleStorySEA_Black.png"
            width="500"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold text-red-600">4HUM MapleSEA</h1>
          <p class="my-4 text-red-950">
            Boss items & cash reminders
          </p>
        </div>
      </div>
      <div class="container mx-auto py-8">
        <ItemList />
      </div>
    </div>
  );
}
