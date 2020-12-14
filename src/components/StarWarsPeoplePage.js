import { useQuery } from '@apollo/client';
import { STAR_WARS_PEOPLE } from '../services/StarWarsApiService';
import { STAR_WARS_PERSON } from '../services/StarWarsApiService';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef  } from 'react';
import ActivityIndicator from '../img/ActivityIndicator.svg';
import ArrowRight from '../img/ArrowRight.svg';
import BackArrow from '../img/BackArrow.svg';


const GENERAL_INFORMATION = [
    { property: 'eyeColor', displayName: "Eye Color"},
    { property: 'hairColor', displayName: "Hair Color"},
    { property: 'skinColor', displayName: "Skin Color"},
    { property: 'birthYear', displayName: "Birth Year"},
]

const VEHICLES_STARSHIPS_INFORMATION = [
    { property: 'name', displayName: ""},
]



export function Header({title, canBack}) {
    return (
        <div className={"header"}>
            {
                canBack?(
                    <img className={"back-arrow"} src={BackArrow} onClick={() => {window.history.back()}}/>
                ):(
                    <div/>
                )
            }
            <h2>{title}</h2>
        </div>
    )
}

export function PersonCell({people, itemNumber}) {
    return (
        <Link to={"/person/" + encodeURI(people.id)}>
            <div className={"cell person-cell"} id={"item-" + itemNumber}>
                <div>
                    <h2>{people.name}</h2>
                    <p className={"low-emphasis"}>{people.species? people.species.name: 'Human'} from {people.homeworld? people.homeworld.name: 'Tatooine'}</p>
                </div>
                <img className={"cell-arrow-right"} src={ArrowRight}/>
            </div>
        </Link>
    )
}

export function LoadingCell() {
    return (
        <div className={"cell loading-cell"}>
            <img className={"activity-indicator"} src={ActivityIndicator}/>
            <h2 className={"low-emphasis"}>Loading</h2>
        </div>
    )
}

export function SectionHeader({title}) {
    return (
        <div className={"section-header"}>
            <h2>{title}</h2>
        </div>
    )
}

export function DataCell({property, value}) {
    return (
        <React.Fragment>
            <div className={"cell data-cell"}>
                <div>
                    <h2 className={"low-emphasis"}>{property}</h2>
                </div>
                {
                    value !== ""? (
                        <div>
                            <h2>{value}</h2>
                        </div>
                    ): (<div/>)
                }
            </div>
            <hr/>
        </React.Fragment>
    )
}

export function NoticeCell({text}) {
    return (
        <div className={"cell"}>
            <h2 className={"high-emphasis"}>{text}</h2>
        </div>
    )
}

export function InfoSection({sectionTitle, data, fields}) {
    return (
        <div>
            <SectionHeader title={sectionTitle}/>
            {
                Array.isArray(data)? (
                    data.map((element, i) => (
                        <DataCell key={i} value="" property={element.name}/>        
                    ))
                ):(
                    fields.map((element, i) => (
                        <DataCell key={i} property={element.displayName} value={data[element.property]}/>        
                    ))
                )
            }
        </div>
    )
}

export function StarWarsPeople({query}) {
    const [page, setPage] = useState(1);
    const [locked, setLock] = useState(false);
    const { loading, error, data, fetchMore } = useQuery(query);
    const loader = useRef(null);

    useEffect(() => {
        if (!locked){
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
              }
            const observer = new IntersectionObserver(handleObserver, options);
            if (loader.current) {
                observer.observe(loader.current)
             }
        }
    });

    const handleObserver = (entities) => {
        const target = entities[0];
        
        if (target.isIntersecting) { 
            setLock((locked) => true);
            setPage((page) => page + 1);
        }
    }

    useEffect(() => {
        if (data) {
            fetchMore({
                variables: {
                    cursor: data.allPeople.pageInfo.endCursor,
                },
            }).then((res) => console.log(res), (err) => console.log(err))
        }
    }, [page])

    if (loading) return <LoadingCell/>;
    if (error) return <NoticeCell text={"Failed to Load Data"}/>;

    return (
        <div id={"people-list"}>
            {
                data.allPeople.edges.map(({ node }, i) => (
                    <PersonCell key={i} people={node} itemNumber={i + 1}/>
                ))
            }
            <div className="loading" ref={loader}>
                <LoadingCell/>
           </div>
        </div>
        
    )
}

export function StarWarsPerson({personId, screen}) {
    const { loading, error, data, fetchMore } = useQuery(STAR_WARS_PERSON, {
        variables: {
            id: personId
        }
    });

    if (loading) return <LoadingCell/>;
    if (error) return <NoticeCell text={"Failed to Load Data"}/>;
    
    if (screen.state.name === undefined) {
        screen.setState({name: data.person.name})
    }
    
    return (
        <div>
            <InfoSection sectionTitle="General Information" data={data.person} fields={GENERAL_INFORMATION} />
            <InfoSection sectionTitle="Vehicles" data={data.person.vehicleConnection.vehicles} fields={VEHICLES_STARSHIPS_INFORMATION} />
            <InfoSection sectionTitle="Starships" data={data.person.starshipConnection.starships} fields={VEHICLES_STARSHIPS_INFORMATION} />
        </div>
    )
}