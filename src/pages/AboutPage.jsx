import { Container } from 'react-bootstrap';
import Header from '../include/Header';

const AboutPage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        {/* //btn btn-outline-primary => 마우스 갖다대면 색상 변경 */}
        <button className="btn btn-outline-primary" type="button">
          About Page
        </button>
      </div>
    </Container>
  );
};

export default AboutPage;