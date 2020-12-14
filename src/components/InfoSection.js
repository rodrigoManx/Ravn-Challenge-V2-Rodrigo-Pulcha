import { DataCell } from "./Cells"


function SectionHeader({title}) {
    return (
        <div className={"section-header"}>
            <h2>{title}</h2>
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
                        <DataCell key={i} value="" property={element[fields]}/>        
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