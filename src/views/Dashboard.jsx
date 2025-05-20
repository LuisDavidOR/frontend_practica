import { Container, Card } from "react-bootstrap";

const Dashboard = () => {

  return(
    <Container>
      <br />
      <Card style={{height: 600}}>
        <iframe
          title="estadisticas"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/view?r=eyJrIjoiZDUxMjcxOTgtZDI4MC00YjZmLTg1YzktNGQ0N2U5MWFmNjVhIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
        ></iframe>
      </Card>
    </Container>
  );
};

export default Dashboard;