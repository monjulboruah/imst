import "./widgetLg.css";

export default function WidgetLg(props) {
  //let ticketData = props.ticketData;
  const Button = ({ type, name }) => {
    return <button className={"widgetLgButton " + type}>{name}</button>;
  };
  //console.log(ticketData);
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">{props.title}</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Created By</th>
          <th className="widgetLgTh">Due Date</th>
          <th className="widgetLgTh">Assignee</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Monjul Boruah</span>
          </td>
          <td className="widgetLgDate">10 Mar 2022</td>
          <td className="widgetLgAmount">Kstiz Verma</td>
          <td className="widgetLgStatus">
            <Button type="Approved" name="Completed"/>
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Monjul Boruah</span>
          </td>
          <td className="widgetLgDate">10 Mar 2022</td>
          <td className="widgetLgAmount">Kstiz Verma</td>
          <td className="widgetLgStatus">
            <Button type="Declined" name="Not started"/>
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Monjul Boruah</span>
          </td>
          <td className="widgetLgDate">10 Mar 2022</td>
          <td className="widgetLgAmount">Kstiz Verma</td>
          <td className="widgetLgStatus">
            <Button type="Pending" name="In Progeress"/>
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Monjul Boruah</span>
          </td>
          <td className="widgetLgDate">10 Mar 2022</td>
          <td className="widgetLgAmount">Kstiz Verma</td>
          <td className="widgetLgStatus">
            <Button type="Approved" name="Completed"/>
          </td>
        </tr>
      </table>
    </div>
  );
}
