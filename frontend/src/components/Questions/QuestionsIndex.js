import "./Questions.css"
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
function QuestionsIndex() {

    return (
        <>
            <div className="header-buffer"></div>
            <div className="questions-main">
                <LeftSideMenu />
                <div className="questions-index">
                    Questions will appear here
                </div>
            </div>
        
        </>
    )
}

export default QuestionsIndex;