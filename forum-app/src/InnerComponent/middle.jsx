import Main from "./main";
import Side from "./side";
import SideStart from "./side_start";

/**
 * @description This is the middle component where the main and side components are displayed (it is the main contents of the page)
 * @returns Middle component
 */
const Middle = () => {
    return (  
        <section id="middle">
            <SideStart/>
            <Main />
            <Side />

        </section>
       );
}
 
export default Middle;