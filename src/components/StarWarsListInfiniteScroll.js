import React, { useEffect, useState, useRef } from 'react';
import { NoticeCell, LoadingCell, ItemCell } from "./Cells"
import { fetchList } from '../services/StarWarsApiService';


export function StarWarsListInfiniteScroll({object}) {
    const [page, setPage] = useState(1);
    const [locked, setLock] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const [items, setItems] = useState([]);
    const loader = useRef(null);

    const getRows = (page) => {
        fetchList(object.table, page).then(
            (data) => {
                setData(data);
                if (data.results) {
                    setItems(items.concat(data.results))
                }
            }
        ).catch((error) => {
            setError(true)
        }); ;
    };

    useEffect(() => {
        getRows();
    }, []);

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
            if (data.next) {
                setPage(page + 1);
            }
        }
    }

    useEffect(() => {
        if (data && data.next) {
            getRows(page);
        }
    }, [page])

    /* if (loading && data.next) return <LoadingCell/>; */
    if (error) return <NoticeCell text={"Failed to Load Data"}/>;
    if (!data || data.results.length === 0) return <div></div>
    return (
        <div>
            {
                items.map((item, i) => (
                    <ItemCell key={i} data={item} object={object}/>
                ))
            }
            {
                data.next? (
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
