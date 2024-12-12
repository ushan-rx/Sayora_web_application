import { create } from 'zustand'
import axios from 'axios';

export const usePatientStore = create((set) => ({

    patient: {
        patientId: '',
        fName: '',
        lName: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        allergies: [],
        familyHistory: [],
        currentMedications: [],
        surgicalProcedures: [],
        vitals: [{}],
        treatmentHistory: [],
        prescriptions: [],
        dailyQuestions: [],
    },
    loading: false,
    error: false,
    errorData: null,
    success: false,

    // fetch patteint data from backend and set to store
  setPatientDetails: async (patientId, options = {}) => {
    set({ loading: true, error: false, errorData: null, success: false })

    try {
      const response = await axios.get(`http://localhost:5000/api/v1/patient/${patientId}`) // replace with your actual API call
      set({ patient: response?.data.patient, loading: false, success: true })
      options.onSuccess?.(response)
    } catch (error) {
      set({ loading: false, error: true, errorData: error })
      options.onError?.(error)
    } finally {
      options.onFinal?.()
    }

  },
    
  // individual setters
    // setPatientId: (patientId) => set({ patientId }),
    // setFname: (fname) => set({ fname }),
    // setLname: (lname) => set({ lname }),
    // setDob: (dob) => set({ dob }),
    // setGender:(gender)=> set({gender}),
    // setBloodGroup:(bloodGroup)=> set({bloodGroup}),
    // setAllergies:(allergies)=> set({allergies}),
    // setFamilyHistory:(familyHistory)=> set({familyHistory}),
    // setCurrentMedications:()=> set({currentMedications}),
    // setSurgicalProcedures:()=> set({surgicalProcedures}),
    // setVitals:()=> set({vitals}),
    // setTreatmentHistory:()=> set({treatmentHistory}),
    // setPrescriptions:()=> set({prescriptions}),
    // setDailyQuestions:()=> set({dailyQuestions}),


    // set all values at once
    // setPatientDetails: (patientDetails) => set({
    //     patientId: patientDetails?.patientId,
    //     fname: patientDetails?.fname,
    //     lname: patientDetails?.lname,
    //     dob: patientDetails?.dob,
    //     gender: patientDetails?.gender,
    //     bloodGroup: patientDetails?.bloodGroup,
    //     allergies: patientDetails?.allergies,
    //     familyHistory: patientDetails?.familyHistory,
    //     currentMedications: patientDetails?.currentMedications,
    //     surgicalProcedures: patientDetails?.surgicalProcedures,
    //     vitals: patientDetails?.vitals,
    //     treatmentHistory: patientDetails?.treatmentHistory,
    //     prescriptions: patientDetails?.prescriptions,
    //     dailyQuestions: patientDetails?.dailyQuestions,

    // })
}))

