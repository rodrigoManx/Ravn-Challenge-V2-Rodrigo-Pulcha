import { useQuery } from '@apollo/client';
import React, { useEffect, useState, useRef } from 'react';
import { NoticeCell, LoadingCell, ItemCell } from "./Cells"



export function StarWarsListInfiniteScroll({object}) {
    const [page, setPage] = useState(1);
    const [locked, setLock] = useState(false);
    const { loading, error, data, fetchMore } = useQuery(object.query);
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
                    cursor: data[object.field].pageInfo.endCursor,
                },
            }).then((res) => console.log(res), (err) => console.log(err))
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
            <div className="loading" ref={loader}>
                <LoadingCell/>
           </div>
        </div>
        
    )
}
