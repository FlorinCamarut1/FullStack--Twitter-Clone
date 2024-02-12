import { create } from 'zustand';

interface DeletePostStore {
  isOpen: boolean;
  isConfirmed: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteModal = create<DeletePostStore>((set) => ({
  isOpen: false,
  isConfirmed: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteModal;
