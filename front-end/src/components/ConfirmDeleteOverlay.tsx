type ConfirmDeleteOverlayProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDeleteOverlay({
  visible,
  onConfirm,
  onCancel,
}: ConfirmDeleteOverlayProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-11/12 shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">
          Are you sure you want to delete this?
        </h2>
        <p className="text-gray-600 mb-6">
          This will permanently delete this item.
        </p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
