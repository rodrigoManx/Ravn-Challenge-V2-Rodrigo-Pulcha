import BackArrow from '../img/BackArrow.svg';


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
