// store state related to the examination panel and apointment list
//(to update the patient details state according to new submits)

import { create } from 'zustand'

export const useExaminationStore = create((set) => ({
    isRefetchNeeded: false,
    isRefetchExaminationNeeded: false,
    setRefetchNeeded: () => set((state) => ({ isRefetchNeeded: !state.isRefetchNeeded })),
    setRefetchExaminationNeeded: () => set((state) => ({ isRefetchExaminationNeeded: !state.isRefetchExaminationNeeded })),
}))