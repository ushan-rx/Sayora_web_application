import { create } from 'zustand'

export const useUserStore = create((set) => ({

    userId: '',
    roleId: '',   // patient id/ doctor id/ staff id
    userMail: '',
    userRole: '',
    setUserId: (userId) => set({ userId }),
    setRoleID: (roleId) => set({ roleId }),
    setUserMail: (userMail) => set({ userMail }),
    setUserRole: (userRole) => set({ userRole }),
}))