import styled from 'styled-components';
import ContactWindow from './ContactWindow';

const Section = styled.div`
  background: #ffffff;
  padding: 40px 40px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding-top: 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-family: 'Kelly Slab', serif;
  font-weight: 500;
  font-size: 32px;
  text-align: center;
  color: #1a1a1a;

  @media (max-width: 900px) {
    margin-bottom: 20px;
  }
`;

const Statement = styled.p`
  font-family: 'Sintony', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
  color: #333;
  margin: 0 0 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 900px) {
    margin-bottom: 24px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 340px) minmax(0, 420px);
  justify-content: center;
  gap: 16px;
  align-items: start;
  max-width: 776px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactSection = () => {
  return (
    <Section id="contact">
      <Container>
        <Heading>Get in Touch</Heading>
        <Statement>
          If you scrolled this far, I think we should be friends. Connect with me on my socials!
        </Statement>

        <Layout>
          <LeftColumn>
            <ContactWindow variant="resume" />
            <ContactWindow variant="socials" />
          </LeftColumn>

          <ContactWindow variant="message" />
        </Layout>
      </Container>
    </Section>
  );
};

export default ContactSection;
