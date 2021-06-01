import React, { useEffect, useState, useRef } from 'react';
import { NoticeCell, LoadingCell, ItemCell } from "./Cells"
import { fetchList } from '../services/StarWarsApiService';


export function StarWarsListInfiniteScroll({object}) {
    const [page, setPage] = useState(1);
    const [locked, setLock] = useState(false);
    const [error, setError] = useState(false);
    const [end, setEnd] = useState(false);
    const [items, setItems] = useState([]);
    const [get, setGet] = useState(false);
    const loader = useRef(null);

    const getRows = (page) => {
        fetchList(object.table, page).then(
            (data) => {
                if (!data) {
                    setError(true)
                }
                else if (data.results) {
                    setItems(items.concat(data.results))
                    setLock(false)
                    setGet(false)
                }
                else {
                    setEnd(true);
                }
            }
        )
    };

    useEffect(() => {
        if (get){
            getRows(page);
        }
    }, [get]);

    useEffect(() => {
        if (locked){
            setGet(false)
        }
    }, [locked]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
            }
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }
    }, [locked, get, items]);

    const handleObserver = (entities) => {
        const target = entities[0];
        
        if (target.isIntersecting && !locked) {
            setGet(true)
            setPage(page + 1)
        }
    }

    if (error) return <NoticeCell text={"Failed to Load Data"}/>;
    if (!items) return <div className="loading" ref={loader}><LoadingCell/></div>
    return (
        <div>
            {
                items.map((item, i) => (
                    <ItemCell key={i} data={item} object={object}/>
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
