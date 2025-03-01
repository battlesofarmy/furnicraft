import { create } from "zustand";

type CounterState = {
    count: number;
    setCount: (value: number) => void; // ✅ Function to manually set count
    cartCount: ()=> void
    decrease: ()=> void
}

// Create a store
const useCounterStore = create<CounterState>((set) => ({
    count: 0, // ✅ Initial default value
    setCount: (value) => set({ count: value }), // ✅ Set count dynamically
    cartCount: () => set((state) => ({ count: state.count + 1 })), // ✅ Function to update state
    decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCounterStore;