import React from 'react';
import ArrowRight from '../img/ArrowRight.svg';
import ActivityIndicator from '../img/ActivityIndicator.svg';
import { Link } from 'react-router-dom';


export function DataCell({property, value}) {
    return (
        <React.Fragment>
            <div className={"cell data-cell"}>
                <div style={{textAlign: "left", width: value !== ""? "50%":"100%"}}>
                    <h2 className={"low-emphasis"}>{property}</h2>
                </div>
                {
                    value !== ""? (
                        <div style={{textAlign: "right", width: "50%"}}>
                            <h2>{value}</h2>
                        </div>
                    ): (<div/>)
                }
            </div>
            <hr/>
        </React.Fragment>
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

export function NoticeCell({text}) {
    return (
        <div className={"cell"}>
            <h2 className={"high-emphasis"}>{text}</h2>
        </div>
    )
}

export function ItemCell({data, object}) {
    const path = object.pathKey && data[object.pathKey]? object.path + data[object.pathKey] : data.path;
    const description = object.description? object.description(data) : data.description;
    return (
        data.name && path?(
            <Link to={encodeURI(path)}>
                <div className={"cell item-cell"}>
                    <div>
                        <React.Fragment>
                            <h2>{data.name}</h2>
                            <p className={"low-emphasis"}> { description } </p>
                        </React.Fragment>        
                    </div>
                    <img className={"cell-arrow-right"} src={ArrowRight}/>
                </div>
            </Link>
        ):( <div/> )
    )
}