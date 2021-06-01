import { useQuery } from '@apollo/client';
import React, { useEffect, useState, useRef } from 'react';
import { NoticeCell, LoadingCell, ItemCell } from "./Cells"



export function StarWarsListInfiniteScroll({object}) {
    const [page, setPage] = useState(1);
    const [locked, setLock] = useState(false);
    const { loading, error, data, fetchMore } = useQuery(object.query);
    const [end, setEnd] = useState(false);
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
            setLock(true);
            setPage(page + 1);
            window.setTimeout(() => {
                if (!end) {
                    setLock(false);
                }
            }, 500);
        }
    }

    useEffect(() => {
        if (data) {
            fetchMore({
                variables: {
                    cursor: data[object.field].pageInfo.endCursor,
                },
            }).then(
                (res) => {
                    if (data[object.field].pageInfo && !data[object.field].pageInfo.hasNextPage) {
                        setEnd(true);
                    }
                }
            )
        }
    }, [page])

    if (loading) return <LoadingCell/>;
    if (error) return <NoticeCell text={"Failed to Load Data"}/>;

    return (
        <div>
            {
                data[object.field].edges.map(({ node }, i) => (
                    <ItemCell key={i} data={node} object={object}/>
                ))
            }
            {
                !end? (
                    <div className="loading" ref={loader}>
                        <LoadingCell/>
                    </div>
                ):(
                    <div className="loading" ref={loader}></div>
                )
            }
            
        </div>
        
    )
}
