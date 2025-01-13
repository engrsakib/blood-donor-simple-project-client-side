import { useNavigate } from 'react-router-dom';



const Fourzero = () => {
  const navigate = useNavigate();
  const img =
    "https://i.ibb.co.com/dtJsgrH/red-exclamation-circle-sign-warning-danger-risk-message-alert-problem-icon-background-concept-3d-ren.jpg";
    return (
      <>
        <div className="flex flex-col items-center my-6">
          <img className="mx-auto" src={img} alt="errorpages" />
          <button
            onClick={() => navigate("/")}
            className="btn w-[350px] md:w-[650px] btn-accent mt-9"
          >
            GO Home
          </button>
        </div>
      </>
    );
};

export default Fourzero;