'use client'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useEffect, useRef, useState, RefObject, ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBriefcase,
  faGavel,
  faCaretDown,
  faCaretUp,
  faHospital,
  faPersonChalkboard,
  faGraduationCap,
  faStar,
  faBuildingColumns,
  faFileLines,
  faPenFancy,
  faPeopleGroup,
  faPeopleCarryBox,
  faHandshakeSimple,
  faCircleArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {
  russKRyanEducation,
  russKRyanBarAdmissions,
  russKRyanCourtAdmissions,
  russKRyanRatingsAndDesignations,
  russKRyanPriorExperience,
  russKRyanPublicAndCommunityService,
  russKRyanAffiliations,
  russKRyanExpertise,
  russKRyanClients,
} from '@/app/content';

import '@/app/ui/about-carousel.css';
import { transformTextToUrlParams } from '@/app/lib/utils'

const subSectionHeaders = [
  {
    title: 'Employment',
    icon: <FontAwesomeIcon icon={faBriefcase} />,
  }, {
    title: 'Training',
    icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
  }, {
    title: 'Health Care, Business and Real Estate',
    icon: <FontAwesomeIcon icon={faHospital} />,
  }, {
    title: 'Litigation',
    icon: <FontAwesomeIcon icon={faGavel} />,
}]

const sectionHeaders = [
  {
    title: 'Education',
    icon: <FontAwesomeIcon icon={faGraduationCap} />,
  }, {
    title: 'Bar and Court Admissions',
    icon: <FontAwesomeIcon icon={faBuildingColumns} />,
  }, {
    title: 'Ratings and Designations',
    icon: <FontAwesomeIcon icon={faStar} />,
  }, {
    title: 'Positions',
    icon: <FontAwesomeIcon icon={faFileLines} />,
  }, {
    title: 'Professional Practice',
    icon: <FontAwesomeIcon icon={faPenFancy} />,
  }, 
  ...subSectionHeaders,
  {
    title: 'Affiliations',
    icon: <FontAwesomeIcon icon={faPeopleGroup} />,
  }, {
    title: 'Public and Community Service',
    icon: <FontAwesomeIcon icon={faPeopleCarryBox} />,
  }, {
    title: 'Clients',
    icon: <FontAwesomeIcon icon={faHandshakeSimple} />,
}]

function BlankArrow(_props: any) {
    return <div style={{ display: "none" }} />
}

const renderSideNavItem = (
  header: { title: string, icon: ReactNode },
  open: boolean,
  toggleOpen: () => void,
  nodeRef: RefObject<null> | null,
  toggleSlide: () => void,
) => {
  let className

  const title = header.title
  const icon = header.icon

  if (title === 'Professional Practice') {
    return (
      <Tab key={title}>
        <button
          className="tab neverChosen"
          onClick={(e) => { 
            toggleOpen()
            e.stopPropagation()
          }}
        >
          <div className="icon">{icon}</div>
          <p>{title}</p>
          <div className="dropdownIcon" >
            {open
              ? <FontAwesomeIcon icon={faCaretUp} />
              : <FontAwesomeIcon icon={faCaretDown} />}
          </div>
        </button>
      </Tab>
    )
  } else if (subSectionHeaders.map(thisHeader => thisHeader.title).includes(title)) {
    className = !open
      ? 'hidden'
      : 'nested'

    return (
        <Tab key={title}>
          <CSSTransition 
            nodeRef={nodeRef}
            in={open}
            timeout={1000}
            classNames="fade-bounce-down"
            key={title}
          >
            <button className={`tab ${className}`} ref={nodeRef} onClick={toggleSlide}>
              <div className="icon">{icon}</div>
              <p>{title}</p>
            </button>
          </CSSTransition>
        </Tab>
    )
  } else {
    return (
      <Tab key={title}>
        <button className="tab" onClick={toggleSlide}>
          <div className="icon">{icon}</div>
          <p>{title}</p>
        </button>
      </Tab>
    )
  }
}

const mapExpertise = (expertise: { name: string, content: (string | string[] | {
  title: string;
  content: string;
}[])[]}) => (
  <div className="expertise" key={expertise.name}>
    <div className="expertiseContentContainer">
      {expertise.content.map((paragraphOrList)  => (
        typeof paragraphOrList == 'string' 
          ? <p key={paragraphOrList}>{paragraphOrList}</p>
          : <ul key={typeof paragraphOrList[0] === 'string' ? paragraphOrList[0] : paragraphOrList[0].title}>
            {paragraphOrList.map(item => (
              typeof item === 'string'
                ? <li key={item}>{item}</li>
                : <li key={item.title}>
                    {item.title}
                    <ul className="nested"><li key={item.content}>{item.content}</li></ul>
                  </li>
            ))}
          </ul>
      ))}
    </div>
  </div>
)

export default function Carousel() {
  const componentRef = useRef(null);
  const searchParams = useSearchParams()
  const initialSlideTopic = searchParams.get('topic')
  const initialExpand = searchParams.get('expand')
  const [topic, setTopic] = useQueryState('topic', { defaultValue: initialSlideTopic || '' })
  const [expand, setExpand] = useQueryState('expand', { defaultValue: initialExpand === 'true' ? 'true' : 'false' })
  const [open, setOpen] = useState(initialExpand === 'true')
  const [slide, setSlide] = useState<boolean | string>(true)

  const nodeRef5 = useRef(null);
  const nodeRef6 = useRef(null);
  const nodeRef7 = useRef(null);
  const nodeRef8 = useRef(null);
  const nodeRefSlideMenu = useRef(null);
  const nodeRefSlideDisplay0 = useRef(null);
  const nodeRefSlideDisplay1 = useRef(null);
  const nodeRefSlideDisplay2 = useRef(null);
  const nodeRefSlideDisplay4 = useRef(null);
  const nodeRefSlideDisplay5 = useRef(null);
  const nodeRefSlideDisplay6 = useRef(null);
  const nodeRefSlideDisplay7 = useRef(null);
  const nodeRefSlideDisplay8 = useRef(null);
  const nodeRefSlideDisplay9 = useRef(null);
  const nodeRefSlideDisplay10 = useRef(null);
  const nodeRefSlideDisplay11 = useRef(null);

  const toggleOpen = () => {
    const newValue = !open
    setOpen(newValue)
    setExpand(newValue ? 'true' : 'false')
  }

  const nodeRefs = {
    '4': nodeRef5,
    '5': nodeRef6,
    '6': nodeRef7,
    '7': nodeRef8,
  }

  const initialSlideIndex = initialSlideTopic
    ? sectionHeaders
      .findIndex(sectionHeader => 
        transformTextToUrlParams(sectionHeader.title) === topic
      )
    : 0

  const GoBackArrow = (location: 'top' | 'bottom' = 'top') => location === 'top'
    ? (
      <div className={`backIconContainer ${location}`} onClick={() => setSlide('loading')}>
        <FontAwesomeIcon className="icon" icon={faCircleArrowLeft} />
        <span>See Menu</span>
      </div>
    )
    : (
      <a className={`backIconContainer ${location}`} onClick={() => setTimeout(() => setSlide('loading'), 750)} href="#topic-menu">
        <FontAwesomeIcon className="icon" icon={faCircleArrowLeft} />
        <span>See Menu</span>
      </a>
    )

  useEffect(() => {
    if (initialSlideTopic && componentRef.current) {
      // @ts-ignore
      componentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="aboutCarousel carouselComponent" ref={componentRef}>
      <Tabs
        defaultIndex={initialSlideIndex}
        onSelect={(index: number) => {
          setTopic(transformTextToUrlParams(sectionHeaders[index].title))
        }}
      >
        {/* <TransitionGroup>
          <CSSTransition 
            nodeRef={nodeRefSlideMenu}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          > */}
            <TabList className="customThumbnails" ref={nodeRefSlideMenu}>
              {sectionHeaders.map((sectionHeader, index) => renderSideNavItem(
                sectionHeader,
                open,
                toggleOpen,
                nodeRefs[index.toString() as keyof typeof nodeRefs] || null,
                () => setSlide('loading')
              ))}
            </TabList>
          {/* </CSSTransition>
        </TransitionGroup> */}
        {/* <TransitionGroup> */}
          {/* <CSSTransition 
            nodeRef={nodeRefSlideDisplay0}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay0}>
                {GoBackArrow()}
                <h3>{sectionHeaders[0].title}</h3>
                <ul className="educationContainer">
                  {russKRyanEducation.map(education => (
                    <li className="education" key={education.institution}>
                      {education.degree} - {education.rank} — {education.institution} — {education.year}
                    </li>
                  ))}
                </ul>

            </TabPanel>
          {/* </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay1}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay1}>
                {GoBackArrow()}
                <h3>{sectionHeaders[1].title}</h3>
                <h4>Bar Admissions</h4>
                <ul className="barAdmissionsContainer">
                  {russKRyanBarAdmissions.map(barAdmission => (
                    <li
                      key={barAdmission.state}
                      className="barAdmission"
                    >
                      {barAdmission.state}, {barAdmission.year}
                    </li>
                  ))}
                </ul>
                <h4>Court Admissions</h4>
                <ul className="courtAdmissionsContainer">
                  {russKRyanCourtAdmissions.map(courtAdmission => (
                    <li
                      key={courtAdmission}
                      className="courtAdmission"
                    >
                      {courtAdmission}
                    </li>
                  ))}
                </ul>            

            </TabPanel>
          {/* </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay2}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay2}>
                {GoBackArrow()}
                {GoBackArrow('bottom')}
                <h3>{sectionHeaders[2].title}</h3>
                <ul className="ratingsAndDesignationsContainer">
                  {russKRyanRatingsAndDesignations.map(ratingOrDesignation => (
                    <li
                      key={ratingOrDesignation.title}
                      className="ratingOrDesignation"
                    >
                      {ratingOrDesignation.title} — {ratingOrDesignation.years}
                    </li>
                  ))}
                </ul>

            </TabPanel>
          {/* </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay4}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay4}>
                {GoBackArrow()}
                {GoBackArrow('bottom')}
                <h3>{sectionHeaders[3].title}</h3>
                <ul className="experienceContainer">
                  {russKRyanPriorExperience.map(experience => (
                    <li className="experience" key={experience.years}>
                      {experience.position} — {experience.institution} — {experience.years}
                    </li>
                  ))}
                </ul>      

            </TabPanel>
          {/* </CSSTransition> */}
          <TabPanel />
          {/* <CSSTransition 
            nodeRef={nodeRefSlideDisplay5}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay5}>
                {GoBackArrow('bottom')}
                {GoBackArrow()}
                <h3>{sectionHeaders[5].title}</h3>
                <div className="expertiseContainer">
                  {mapExpertise(russKRyanExpertise[0])}
                </div>

            </TabPanel>
          {/* </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay6}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay6}>
                {GoBackArrow('bottom')}
                {GoBackArrow()}
                <h3>{sectionHeaders[6].title}</h3>
                <div className="expertiseContainer">
                  {mapExpertise(russKRyanExpertise[1])}
                </div>

            </TabPanel>
          {/* </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay7}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay7}>
                {GoBackArrow()}
                <h3>{sectionHeaders[7].title}</h3>
                <div className="expertiseContainer">
                  {mapExpertise(russKRyanExpertise[2])}
                </div>

            </TabPanel>
          {/* </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay8}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay8}>
                {GoBackArrow()}
                {GoBackArrow('bottom')}
                <h3>{sectionHeaders[8].title}</h3>
                <div className="expertiseContainer">
                  {mapExpertise(russKRyanExpertise[3])}
                </div>

            </TabPanel>
          {/* </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay9}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay9}>
                {GoBackArrow()}
                {GoBackArrow('bottom')}
                <h3>{sectionHeaders[9].title}</h3>
                <ul className="affiliationsContainer">
                  {russKRyanAffiliations.map(affiliation => (
                    <li
                      key={affiliation}
                      className="affiliation"
                    >
                      {affiliation}
                    </li>
                  ))}
                </ul>

            </TabPanel>
          {/* </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay10}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay10}>
                {GoBackArrow()}
                <h3>{sectionHeaders[10].title}</h3>
                <ul className="serviceContainer">
                  {russKRyanPublicAndCommunityService.map(service => (
                    <li className="service" key={service.years}>
                      {service.position} — {service.institution} — {service.years}
                    </li>
                  ))}
                </ul>

            </TabPanel>
          {/* </CSSTransition>
          <CSSTransition
            nodeRef={nodeRefSlideDisplay11}
            in={!slide}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(true)}
          > */}
            <TabPanel className="slide" ref={nodeRefSlideDisplay11}>
                {GoBackArrow('bottom')}
                {GoBackArrow()}
                <h3>{sectionHeaders[11].title}</h3>
                <h4>Present</h4>
                <ul className="clientsContainer past">
                  {russKRyanClients.current.map(client => (
                    <li
                      key={client}
                      className="client"
                    >
                      {client}
                    </li>
                  ))}
                </ul>
                <h4>Past</h4>
                <ul className="clientsContainer present">
                  {russKRyanClients.past.map(client => (
                    <li
                      key={client}
                      className="client"
                    >
                      {client}
                    </li>
                  ))}
                </ul>

            </TabPanel>
          {/* </CSSTransition> */}
        {/* </TransitionGroup> */}
      </Tabs>
    </div>
  )
}
