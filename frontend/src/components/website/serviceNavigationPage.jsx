import { useNavigate } from "react-router-dom";
import awarenessSession from "./awarenessSession.png";
import physicalTraining from "./physicalTraining.png";
import homeVisits from "./homeVisits.png";


const HomePage = () => {
const navigate = useNavigate();

const navigateToAwarenessProgramHome = () => {
  navigate("/awarenessProgramHome");

  };
  

  return (
    <div className="relative">
    <div className=" flex flex-col md:flex-row items-center justify-center h-screen space-y-6 md:space-y-0 md:space-x-6">
      <div className="bg-blue-50 hover:bg-blue-300 p-6 rounded-lg shadow-md border-2 border-blue-200 w-full md:w-1/4 hover:shadow-lg transition duration-200">
        <img src={awarenessSession} alt="Awareness" className="mx-auto"/>
        <h2 className="text-xl font-bold text-center mt-4">Awareness Programs</h2>
        <p className="text-sm md:text-base text-center mt-2">
          Health awareness sessions play a pivotal role in empowering individuals with the knowledge and skills necessary to make informed decisions about their well-being. These sessions serve as platforms for disseminating essential information, debunking myths, and promoting healthy behaviors within communities. Whether conducted in schools, workplaces, community centers, or online platforms, effective health awareness sessions aim to educate, engage, and inspire individuals to prioritize their health and adopt positive lifestyle changes.
        </p>
        <button onClick={navigateToAwarenessProgramHome} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block">
          Navigate
        </button>
      </div>
      <div className="bg-blue-100 hover:bg-blue-300 p-6 rounded-lg shadow-md border-2 border-blue-300 w-full md:w-1/4 hover:shadow-lg transition duration-200">
        <img src={physicalTraining} alt="Card 2" className="mx-auto"/>
        <h2 className="text-xl font-bold text-center mt-4">Physical Training Programs</h2>
        <p className="text-sm md:text-base text-center mt-2">
          Physical training programs are structured regimens designed to improve physical fitness and overall well-being. Tailored to individual needs and goals, these programs typically include a combination of cardiovascular exercise, strength training, flexibility exercises, and functional movements. By providing guidance, accountability, and progressive challenges, they help individuals enhance their strength, endurance, flexibility, and overall health. Physical training programs are led by certified fitness professionals who provide personalized instruction.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block">
          Navigate
        </button>
      </div>
      <div className="bg-blue-200 hover:bg-blue-300 p-6 rounded-lg shadow-md border-2 border-blue-400 w-full md:w-1/4 hover:shadow-lg transition duration-200">
        <img src={homeVisits} alt="Card 3" className="mx-auto"/>
        <h2 className="text-xl font-bold text-center mt-4">Home Visits</h2>
        <p className="text-sm md:text-base text-center mt-2">
        Home Home visits service offers personalized healthcare assistance in the comfort of one's own residence. A qualified healthcare professional conducts comprehensive assessments, administers treatments, and provides medical care tailored to the individual's needs. This convenient service ensures continuity of care for those unable to visit a medical facility, promoting comfort and convenience. With a focus on patient comfort and convenience, home visits service brings quality healthcare directly.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block">
          Navigate
        </button>
      </div>
    </div>
    </div>
  );
};

export default HomePage;