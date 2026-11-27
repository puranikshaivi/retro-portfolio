import { useState } from 'react';
import styled, { css } from 'styled-components';

/* ------------------------------------------------------------------ */
/*  Icons (unchanged)                                                  */
/* ------------------------------------------------------------------ */
const HEADING_ICON = 'https://win98icons.alexmeub.com/icons/png/computer-5.png';
const FOLDER_ICON =
  'https://win98icons.alexmeub.com/icons/png/directory_closed_cool-4.png';
const CAMERA_ICON = 'https://win98icons.alexmeub.com/icons/png/camera3-2.png';

/* ------------------------------------------------------------------ */
/*  Tree line helpers (Win95 dotted connectors: 1px on / 1px off)      */
/* ------------------------------------------------------------------ */
const LINE = '#808080';

const dotsVertical = css`
  background-image: linear-gradient(to bottom, ${LINE} 1px, transparent 1px);
  background-size: 1px 2px;
  background-repeat: repeat-y;
`;

const dotsHorizontal = css`
  background-image: linear-gradient(to right, ${LINE} 1px, transparent 1px);
  background-size: 2px 1px;
  background-repeat: repeat-x;
`;

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */
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
  margin-left: 12px;

  @media (max-width: 600px) {
    margin-left: 4px;
  }
`;

/*
  One tree node. --row is the height of the title row; every connector
  and icon is positioned from it, so desktop and mobile (taller rows
  for easier tapping) share the same CSS.
*/
const Item = styled.div`
  --row: 24px;
  position: relative;
  padding-bottom: 16px;

  /* vertical connector running down the left edge */
  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 0;
    bottom: 0;
    width: 1px;
    ${dotsVertical}
  }
  &:first-child::before {
    top: calc(var(--row) / 2 - 1px);
  }
  /* last sibling: the line stops at the elbow (└) */
  &:last-child::before {
    bottom: auto;
    height: calc(var(--row) / 2);
  }
  &:first-child:last-child::before {
    display: none;
  }

  /* horizontal branch to the icon */
  &::after {
    content: '';
    position: absolute;
    left: 5px;
    top: calc(var(--row) / 2 - 1px);
    width: 11px;
    height: 1px;
    ${dotsHorizontal}
  }

  @media (max-width: 600px) {
    --row: 32px;
    padding-bottom: 12px;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;

  /* when open, the line continues down from the folder icon to the child */
  ${({ $open }) =>
    $open &&
    css`
      &::after {
        content: '';
        position: absolute;
        left: 26px;
        top: var(--row);
        bottom: 0;
        width: 1px;
        ${dotsVertical}
      }
    `}

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

/* ------------------------------------------------------------------ */
/*  Row pieces                                                         */
/* ------------------------------------------------------------------ */
const TitleText = styled.span`
  display: block;
  min-width: 0;
  margin: calc((var(--row) - 20px) / 2) 0 0 3px;
  padding: 0 3px;
  line-height: 20px;
  white-space: normal;
`;

const Left = styled.button`
  display: flex;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
  min-height: var(--row);
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 16px;
  color: inherit;
  text-align: left;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  /* Win95 "selected item" look for keyboard focus */
  &:focus-visible ${TitleText} {
    background: #000080;
    color: #fff;
    outline: 1px dotted #fff;
    outline-offset: -2px;
  }
`;

/* The Explorer-style [+] / [-] box (12x12, drawn in pure CSS) */
const Box = styled.span`
  position: relative;
  z-index: 1; /* sits on top of the connector lines */
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  margin-top: calc((var(--row) - 12px) / 2);
  margin-right: 7px;
  background: #fff;
  border: 1px solid ${LINE};
  ${({ $empty }) =>
    $empty &&
    css`
      visibility: hidden;
    `}

  /* horizontal bar (the "-") */
  &::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 4px;
    width: 6px;
    height: 1px;
    background: #000;
  }

  /* vertical bar, only when collapsed (turns "-" into "+") */
  &::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 2px;
    width: 1px;
    height: 6px;
    background: #000;
    display: ${({ $open }) => ($open ? 'none' : 'block')};
  }
`;

const NodeIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: calc((var(--row) - 20px) / 2);
`;

const DateLabel = styled.span`
  display: block;
  flex-shrink: 0;
  margin-top: calc((var(--row) - 20px) / 2);
  font-size: 15px;
  line-height: 20px;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 600px) {
    margin: 4px 0 0 42px;
    text-align: left;
    white-space: normal;
  }
`;

/* Child node (the description) with its └ elbow */
const Children = styled.div`
  position: relative;
  margin-left: 26px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 10px;
    ${dotsVertical}
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 9px;
    width: 12px;
    height: 1px;
    ${dotsHorizontal}
  }
`;

const Description = styled.p`
  margin: 0;
  padding: 0 0 0 16px;
  font-size: 13px;
  line-height: 20px;
  max-width: 900px;
`;

const ProjectsAnchor = styled.div`
  scroll-margin-top: 90px;
`;

/* ------------------------------------------------------------------ */
/*  Data (unchanged)                                                   */
/* ------------------------------------------------------------------ */
const experiences = [
  {
    id: 'tue',
    title: 'TU Eindhoven MSc Computer Science',
    description:
      "Currently studying here! Exploring software engineering, algorithms and processes, computer architecture and more.",
    date: 'August 2026 onwards',
    defaultOpen: false,
  },
  {
    id: 'icici',
    title: 'Software Development Engineer at ICICI Lombard',
    description:
      "Spent a year and half (was also an intern here) building and shipping features for ICICI Lombard's production website as part of the frontend engineering team. Worked primarily with Angular, building reusable components, integrating REST APIs, handling validation and UI state, and helping keep production stable through testing and post deployment fixes. Also got to work closely with engineers, QA, and product teams in an Agile environment. Picked up an award for outstanding performance along the way >ᴗ<.",
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
      "Spent four years learning the foundations of computer science and software development, from programming, algorithms, and data structures to databases and software engineering. ",
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

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */
const TreeItem = ({ item, iconSrc }) => {
  const hasDescription = Boolean(item.description);
  const [open, setOpen] = useState(Boolean(item.defaultOpen));
  const expanded = hasDescription && open;

  return (
    <Item>
      <Header $open={expanded}>
        <Left
          as={hasDescription ? 'button' : 'div'}
          type={hasDescription ? 'button' : undefined}
          $clickable={hasDescription}
          onClick={hasDescription ? () => setOpen((o) => !o) : undefined}
          aria-expanded={hasDescription ? open : undefined}
        >
          <Box $open={expanded} $empty={!hasDescription} aria-hidden="true" />
          <NodeIcon src={iconSrc} alt="" />
          <TitleText>{item.title}</TitleText>
        </Left>
        <DateLabel>{item.date}</DateLabel>
      </Header>
      {expanded && (
        <Children>
          <Description>{item.description}</Description>
        </Children>
      )}
    </Item>
  );
};

const ExperienceItem = ({ item }) => (
  <TreeItem item={item} iconSrc={FOLDER_ICON} />
);

const ProjectItem = ({ item }) => (
  <TreeItem item={item} iconSrc={CAMERA_ICON} />
);

const ExperienceSection = () => {
  return (
    <Section id="experience">
      <SectionHeading>
        <HeadingIcon src={HEADING_ICON} alt="" />
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
          <HeadingIcon src={HEADING_ICON} alt="" />
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