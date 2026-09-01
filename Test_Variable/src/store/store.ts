import { create } from "zustand";

interface CartStore {
    cartVersion: number;
    cartUpdated: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    cartVersion: 0,

    cartUpdated: () => {
        set((state) => ({
            cartVersion: state.cartVersion + 1,
        }));
    },
}));
