import { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  font-family: 'Sintony', sans-serif;
  color: #1a1a1a;
  // max-width: 700px;
  padding: 40px;

  @media (max-width: 600px) {
    padding: 32px 16px;
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 28px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;

  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const Left = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 16px;
  color: inherit;
  text-align: left;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;

const TitleText = styled.span`
  display: inline;
  min-width: 0;
  white-space: normal;
  overflow: visible;
`;

const TitleWrap = styled.div`
  display: inline-flex;
  align-items: center;
  min-width: 0;
  max-width: 100%;
  flex-wrap: nowrap;
`;

const FolderIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const CameraIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const Arrow = styled.span`
  font-size: 11px;
  margin-left: 6px;
  display: inline-block;
  flex-shrink: 0;
  transform: rotate(${({ $open }) => ($open ? 90 : 0)}deg);
  transition: transform 0.15s ease;
`;

const DateLabel = styled.span`
  display: block;
  font-size: 15px;
  white-space: normal;
  flex-shrink: 0;
  text-align: right;
  margin-top: 2px;

  @media (max-width: 600px) {
    text-align: left;
    margin-left: 28px;
  }
`;

const Description = styled.p`
  margin: 6px 0 0 44px;
  padding-left: 12px;
  border-left: 2px solid #ccc;
  font-size: 13px;
  line-height: 1.6;
  max-width: 900px;

  @media (max-width: 600px) {
    margin-left: 0;
    padding-left: 0;
    border-left: none;
  }
`;

// Swap/add entries here — anything without a `description` renders as a
// plain (non-clickable) row, same as the two education entries in the figma.
const experiences = [
  {
    id: 'tue',
    title: 'TU Eindhoven MSc Computer Science',
    description:
      "Exploring software engineering, advanced algorithms, and computer architecture while drowning in assignments but it's cool. ",
    date: 'August 2026 onwards',
    defaultOpen: false,
  },
  {
    id: 'icici',
    title: 'Software Development Engineer at ICICI Lombard',
    description:
      "Spent a year and half (also was an intern here) building and shipping features for ICICI Lombard's production website as part of the frontend engineering team. Worked primarily with Angular, building reusable components, integrating REST APIs, handling validation and UI state, and helping keep production stable through testing and post deployment fixes. Also got to work closely with engineers, QA, and product teams in an Agile environment. Picked up an award for outstanding performance along the way ;)",
    date: 'Feb 2025 - August 2026',
    defaultOpen: true,
  },
  // {
  //   id: 'icici-intern',
  //   title: 'Software Engineering Intern at ICICI Lombard',
  //   description:
  //     "Started out working on UI improvements and production bug fixes, getting my first real taste of enterprise software development. Learned how to work with Git, Agile sprints, production timelines, and code that actually has to survive outside my laptop.",
  //   date: 'February 2025 - July 2025',
  //   defaultOpen: false,
  // },
  {
    id: 'accenture',
    title: 'Summer Intern at Accenture',
    description:
      "Built Power BI dashboards that gave project managers real-time project insights and reduced manual reporting, while also documenting and automating some customer service processes using Blue Prism. A good introduction to the less-glamorous-but-very-real side of software: making existing processes faster and less painful.",
    date: 'May 2024 - July 2024',
    defaultOpen: false,
  },
  {
    id: 'mumbai',
    title: 'University of Mumbai B.E. in Information Technology',
    description:
      "Spent four years learning the foundations of computer science and software development, from programming, algorithms, and data structures to databases and software engineering. Built a bunch of projects along the way, survived final-year submissions, and eventually made it out with a degree.",
    date: 'August 2021 - June 2025',
    defaultOpen: false,
  },
];

const projects = [
  {
    id: 'tracker',
    title: 'Task tracker',
    description: "Built as an internal tool for a law firm, this is basically a lightweight Jira for managing the team's day-to-day tasks. Admins can create and assign tasks, while team members can update statuses, manage subtasks, and leave comments. It’s built with React and Node.js, with Supabase handling authentication, PostgreSQL data, and role-based access through Row-Level Security.",
    date: 'June 2025',
    defaultOpen: true,
  },
  {
    id: 'password-auth',
    title: 'Visual-Based Password Authentication System',
    description: "Designed and implemented an image-based authentication system using user inputs such as numbers, colours, and objects. Used a generative model to produce visually similar images, leveraging human visual recognition to improve password security and making it harder for automated systems to identify the correct password image.",
    date: 'August 2024',
    defaultOpen: false,
  },
  {
    id: 'document-search',
    title: 'Title Search of Documents in English/Marathi Language',
    description: "Developed a C# program to automate property deed searches across English and Devanagari Marathi, supporting variations in names and numbers. Reduced search results by ~80%, from 300–500 to 50–100, and cut document review time by ~60% through batch downloads, multi-filter searches, and reusable saved search results.",
    date: 'June 2023',
    defaultOpen: false,
  },
];

const ExperienceItem = ({ item }) => {
  const hasDescription = Boolean(item.description);
  const [open, setOpen] = useState(Boolean(item.defaultOpen));

  return (
    <div>
      <Row>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <Left
            as={hasDescription ? 'button' : 'div'}
            $clickable={hasDescription}
            onClick={hasDescription ? () => setOpen((o) => !o) : undefined}
            aria-expanded={hasDescription ? open : undefined}
          >
            <FolderIcon
              src="https://win98icons.alexmeub.com/icons/png/directory_closed_cool-4.png"
              alt=""
            />
            <TitleWrap>
              <TitleText>{item.title}</TitleText>
              {hasDescription && <Arrow $open={open}>▶</Arrow>}
            </TitleWrap>
          </Left>
          <DateLabel>{item.date}</DateLabel>
        </div>
      </Row>
      {hasDescription && open && <Description>{item.description}</Description>}
    </div>
  );
};

const ProjectItem = ({ item }) => {
  const hasDescription = Boolean(item.description);
  const [open, setOpen] = useState(Boolean(item.defaultOpen));

  return (
    <div>
      <Row>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <Left
            as={hasDescription ? 'button' : 'div'}
            $clickable={hasDescription}
            onClick={hasDescription ? () => setOpen((o) => !o) : undefined}
            aria-expanded={hasDescription ? open : undefined}
          >
            <CameraIcon
              src="https://win98icons.alexmeub.com/icons/png/camera3-2.png"
              alt=""
            />
            <TitleWrap>
              <TitleText>{item.title}</TitleText>
              {hasDescription && <Arrow $open={open}>▶</Arrow>}
            </TitleWrap>
          </Left>
          <DateLabel>{item.date}</DateLabel>
        </div>
      </Row>
      {hasDescription && open && <Description>{item.description}</Description>}
    </div>
  );
};


const ProjectsAnchor = styled.div`
  scroll-margin-top: 90px;
`;

const ExperienceSection = () => {
  return (
    <Section id="experience">
      <SectionHeading>
        <HeadingIcon
          src="https://win98icons.alexmeub.com/icons/png/computer-5.png"
          alt=""
        />
        Experience and Education
      </SectionHeading>
      <List>
        {experiences.map((item) => (
          <ExperienceItem key={item.id} item={item} />
        ))}
      </List>
      <br/>
      <br/>
      <br/>
      <ProjectsAnchor id="projects">
        <SectionHeading>
          <HeadingIcon
            src="https://win98icons.alexmeub.com/icons/png/computer-5.png"
            alt=""
          />
          Projects
        </SectionHeading>
        <List>
          {projects.map((item) => (
            <ProjectItem key={item.id} item={item} />
          ))}
        </List>
      </ProjectsAnchor>
    </Section>
  );
};

export default ExperienceSection;
