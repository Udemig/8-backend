import ClientComponent from "./client-component";
import ServerComponent from "./server-component";

const AboutPage = () => {
  return (
    <div>
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
};

export default AboutPage;
