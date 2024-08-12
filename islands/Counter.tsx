import { type Signal } from "@preact/signals";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter({ count }: CounterProps) {
  return (
    <div class="flex gap-8 py-6">
      <button className="btn btn-info" onClick={() => count.value -= 1}>
        -1
      </button>
      <p class="text-3xl tabular-nums">{count.value}</p>
      <button className="btn btn-info" onClick={() => count.value += 1}>
        +1
      </button>
    </div>
  );
}
