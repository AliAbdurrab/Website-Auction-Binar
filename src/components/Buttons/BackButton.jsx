import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import back from "../../assets/icons/fi_arrow-left.svg";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="w-100 bg-primary">
        <Button onClick={() => navigate(-1)}>
          <img src={back} alt="fi_arrow-left.svg" className="backButton" />
        </Button>
      </div>
    </Container>
  );
}

export default BackButton;
