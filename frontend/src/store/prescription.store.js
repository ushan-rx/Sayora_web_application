import { create } from 'zustand'
import axios from 'axios';

const usePrescriptionStore = create((set) => ({
    prescription: {
        patientId: '',
        doctorId: '',
        doctorName: '',
        patientName: '',
        sickness: '',
        medications: [{}],
        instructions: '',
        date: '',
    },

    // individual setters
    setPatientId: (patientId) => set((state) => ({ prescription: { ...state.prescription, patientId } })),
    setDoctorId: (doctorId) => set((state) => ({ prescription: { ...state.prescription, doctorId } })),
    setDoctorName: (doctorName) => set((state) => ({ prescription: { ...state.prescription, doctorName } })),
    setSickness: (sickness) => set((state) => ({ prescription: { ...state.prescription, sickness } })),
    setMedications: (medications) => set((state) => ({ prescription: { ...state.prescription, medications } })),
    setInstructions: (instructions) => set((state) => ({ prescription: { ...state.prescription, instructions } })),
    setDate: (date) => set((state) => ({ prescription: { ...state.prescription, date } })),
    setPatientName: (patientName) => set((state) => ({ prescription: { ...state.prescription, patientName } })),



    // loading: false,
    // error: false,
    // errorData: null,
    // success: false,

    // fetch patteint data from backend and set to store
    // setPrescriptionDetails: async (prescriptionId, options = {}) => {
    //     set({ loading: true, error: false, errorData: null, success: false })

    //     try {
    //         const response = await axios.get(`http://localhost:5000/api/v1/prescription/${prescriptionId}`) // replace with your actual API call
    //         set({ prescription: response?.data.prescription, loading: false, success: true })
    //         options.onSuccess?.(response)
    //     } catch (error) {
    //         set({ loading: false, error: true, errorData: error })
    //         options.onError?.(error)
    //     } finally {
    //         options.onFinal?.()
    //     }

    // },

    // individual setters
    // setPatientId: (patientId) => set((state) => ({ prescription: { ...state.prescription, patientId } })),
    // setDoctorId: (doctorId) => set((state) => ({ prescription: { ...state.prescription, doctorId } })),
    // setDate: (date) => set((state) => ({ prescription: { ...state.prescription, date } })),
    // setDiagnosis: (diagnosis) => set((state) => ({ prescription: { ...state.prescription, diagnosis } })),
    // setMedication: (medication) => set((state) => ({ prescription: { ...state.prescription, medication } })),
    // setTests: (tests) => set((state) => ({ prescription: { ...state.prescription, tests } })),
    // setNotes: (notes) => set((state) => ({ prescription: { ...state.prescription, notes } })),
    // setFollowUp: (followUp) => set((state) => ({ prescription: { ...state.prescription, followUp } })),

}));

export default usePrescriptionStore