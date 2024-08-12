interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function Modal(
  { isOpen, onClose, onConfirm, title, message }: ModalProps,
) {
  return (
    <div class={`modal ${isOpen ? "modal-open" : ""}`}>
      <div class="modal-box w-11/12 max-w-xl">
        <h2 class="font-bold text-2xl">{title}</h2>
        <p class="py-4 text-base">{message}</p>
        <div class="modal-action">
          <button class="btn" onClick={onClose}>Cancel</button>
          <button class="btn btn-error" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
