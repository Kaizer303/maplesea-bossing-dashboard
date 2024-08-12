import { useSignal } from "@preact/signals";
import Counter from "./Counter.tsx";

export default function Stories() {
  const count = useSignal(3);
  return (
    <div>
      <Counter count={count} />
    </div>
  );
}
