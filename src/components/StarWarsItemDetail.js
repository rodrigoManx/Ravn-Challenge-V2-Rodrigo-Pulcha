import React from 'react';
import { useQuery } from '@apollo/client';
import { NoticeCell, LoadingCell } from "./Cells";
import { InfoSection } from "./InfoSection";
import { Header } from './Header';

export function StarWarsItemDetail({id, object, screen}) {
    const { loading, error, data } = useQuery(object.query, {
        variables: {
            id: id
        }
    });

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
    
    return (
        <div>
            <Header title={data[object.name].name} canBack={true}/>
            <InfoSection sectionTitle="General Information" data={data[object.name]} fields={object.generalInformation} />
            {
                object.relations.map((relation, index) => (
                    <InfoSection
                        key={index}
                        sectionTitle={relation.displayName}
                        data={data[object.name][relation.connection]['edges']} fields={relation.information} />
                ))
            }
        </div>
    )
}