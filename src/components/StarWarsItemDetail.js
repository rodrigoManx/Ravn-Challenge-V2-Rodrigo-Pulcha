import React, { useEffect, useState, useRef } from 'react';
import { NoticeCell, LoadingCell } from "./Cells";
import { InfoSection } from "./InfoSection";
import { Header } from './Header';
import { fetchDetail } from '../services/StarWarsApiService';


export function StarWarsItemDetail({id, object, screen}) {
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    const getDetail = () => {
        fetchDetail(object.table, id).then(
            (data) => {
                setData(data);
            }
        ).catch((error) => {
            setError(true)
        }); ;
    };

    useEffect(() => {
        getDetail();
    }, []);

    if (loading) return (
        <React.Fragment>
            <Header title={""} canBack={true}/><LoadingCell/>
        </React.Fragment>
    )
    if (error) return (
        <React.Fragment>
            <NoticeCell text={"Failed to Load Data"}/>
        </React.Fragment>
    )
    
    if (!data) {
        return <div></div>
    }
    return (
        <div>
            <Header title={data.name} canBack={true}/>
            <InfoSection sectionTitle="General Information" data={data} fields={object.generalInformation} />
            {
                object.relations.map((relation, index) => (
                    <InfoSection
                        key={index}
                        sectionTitle={relation.displayName}
                        data={data[relation.connection]} fields={relation.information} />
                ))
            }
        </div>
    )
}