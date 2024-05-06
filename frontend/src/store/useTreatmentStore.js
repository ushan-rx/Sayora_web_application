import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  treatments: [],
  selectedTreatment: null,
};

const store = (set) => ({
  ...initialState,
  setTreatments: (treatments) => set({ treatments }),
  setSelectedTreatment: (treatment) => set({ selectedTreatment: treatment }),
});

export const useTreatmentStore = create(devtools(store, "treatmentStore"));
