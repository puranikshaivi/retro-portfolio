import styled from 'styled-components';

const Section = styled.section`
  font-family: 'Sintony', sans-serif;
  color: #1a1a1a;
  // max-width: 700px;
  padding: 0 40px 40px;

  @media (max-width: 600px) {
    padding: 0 16px 32px;
  }
`;

const SectionHeading = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 26px;
  font-weight: 400;
  padding-bottom: 8px;
  border-bottom: 1px solid #1a1a1a;
  margin: 0 0 24px;
  width: 450px;

  @media (max-width: 600px) {
    width: 100%;
    font-size: 22px;
  }
`;

const HeadingIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 28px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const SkillRow = styled.div`
  display: grid;
  grid-template-columns: 32px 195px 32px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  font-size: 16px;
  padding-left: 8px;

  @media (max-width: 600px) {
    grid-template-columns: 32px minmax(0, 1fr);
    row-gap: 4px;
  }
`;

const RowIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const Label = styled.span`
  white-space: nowrap;

  @media (max-width: 600px) {
    white-space: normal;
  }
`;

const Dash = styled.span`
  width: 32px;
  border-top: 1px solid #999;
  flex-shrink: 0;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Values = styled.span`
  color: #333;

  @media (max-width: 600px) {
    grid-column: 2;
  }
`;

// edit freely — values render joined with " / "
const skills = [
  { id: 'frontend', label: 'Frontend', values: ['Angular', 'React', 'Next JS'] },
  { id: 'backend', label: 'Backend', values: ['Node JS', 'Express', '.Net'] },
  { id: 'programming', label: 'Programming Languages', values: ['JavaScript', 'Python', 'Java', 'C#'] },
  { id: 'databases', label: 'Databases', values: ['MySQL', 'MongoDB', 'PostgreSQL'] },
  { id: 'tools', label: 'Tools', values: ['Figma', 'Git', 'Docker', 'Postman', ] },
];

const SkillsSection = () => {
  return (
    <Section id="tech-stack">
      <SectionHeading>
        <HeadingIcon
          src="https://win98icons.alexmeub.com/icons/png/computer-5.png"
          alt=""
        />
        Tech Stack
      </SectionHeading>
      <Table>
        {skills.map((row) => (
          <SkillRow key={row.id}>
            <RowIcon
              src="https://win98icons.alexmeub.com/icons/png/note-2.png"
              alt=""
            />
            <Label>{row.label}</Label>
            <Dash />
            <Values>{row.values.join(' / ')}</Values>
          </SkillRow>
        ))}
      </Table>
    </Section>
  );
};

export default SkillsSection;
