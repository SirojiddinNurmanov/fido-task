import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getData } from "../../store/action/selectors";
import { priceFormatter } from "../../helper";

import "./modal.css";

function CreditModal(props) {
  const data = useSelector(getData);
  const tableRef = useRef(null);
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          To'lov tartibi
        </Modal.Title>
        <div className="modal-btn">
          <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <button> Axborot varaqasini chiqarish </button>
          </DownloadTableExcel>

          <button onClick={props.onHide}>
            <img src="img/close.png" alt="close" />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-striped" ref={tableRef}>
          <thead>
            <tr>
              <th scope="col">Oy</th>
              <th scope="col">Asosiy qarzning qoldig'i</th>
              <th scope="col">Asosiy qarz bo'yicha to'lov</th>
              <th scope="col">Foizlarni to'lash</th>
              <th scope="col">To'lovning umumiy miqdori</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.number}>
                <th scope="row">{item.number}</th>
                <td>{priceFormatter(item.balans)}</td>
                <td>{priceFormatter(item.aqbt)}</td>
                <td>{priceFormatter(item.ft)}</td>
                <td>{priceFormatter(item.tum)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default CreditModal;
