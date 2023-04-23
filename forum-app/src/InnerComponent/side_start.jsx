import React from 'react';
import TableComponent from "../compontents/table_components";

const Side = () => {
  /**
   * Contains all the values necessary to set the headers
   * and the titles of the tables on the side
   * for the admin
   */
    let title = "Admin";
    let header_array = [""];
    let body_array = [
        ["Create Category"],
        ["Create Topic"],
        ["Close Topic"],
        ["Delete Topic"]
    ];
    let tables = [
      {
        title: title,
        headers: header_array,
        data: body_array,
        id:"side_components_table_admin"
      }
    ];
    return (  
        <section id = "section_tables_side">
            <TableComponent tables={tables} />
        </section>
     );
}
 
export default Side;