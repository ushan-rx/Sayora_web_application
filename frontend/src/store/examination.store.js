// store state related to the examination panel
//(to update the patient details state according to new submits)

import { create } from 'zustand'

export const useExaminationStore = create((set) => ({
    isRefetchNeeded: false,
    setRefetchNeeded: () => set({ isRefetchNeeded: !isRefetchNeeded }),
}))