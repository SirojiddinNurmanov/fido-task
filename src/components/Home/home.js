import React, { useState } from "react";
import CreditModal from "../Modal";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../store/action/selectors";
import { annuted, differensial } from "../../store/action/actions";
import { priceFormatter_2 } from "../../helper";

import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(getData);
  const [isAnnuited, setIsAnnuited] = useState(true);
  const [creditValue, setCreditValue] = useState(100000000);
  const [creditTime, setCreditTime] = useState(24);
  const [modalShow, setModalShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0.8);

  const update = () => {
    isAnnuited
      ? dispatch(annuted(creditTime, creditValue * selectedValue))
      : dispatch(differensial(creditTime, creditValue * selectedValue));
  };
  update();

  let creditSum = 0;
  let allSum = 0;
  data.forEach((item) => {
    creditSum = creditSum + item.ft;
    allSum = allSum + item.aqbt;
  });
  return (
    <div className="container">
      <CreditModal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="row">
        <h3 className="credit-header">Kredit kalkulyatori</h3>
        <div className="col-sm-12 col-md-12 col-lg-8">
          <div className="credit">
            <div className="credit-type">
              <h6 className="title">Kredit turi</h6>
              <div className="credit-type-body">
                <select>
                  <option>Avtokredit</option>
                  <option>Avtokredit</option>
                  <option>Avtokredit</option>
                </select>
                <div className="type-selector">
                  <button
                    className={isAnnuited ? "credit-btn active" : "credit-btn"}
                    onClick={() => setIsAnnuited(true)}
                  >
                    Annuitet
                  </button>
                  <button
                    className={!isAnnuited ? "credit-btn active" : "credit-btn"}
                    onClick={() => setIsAnnuited(false)}
                  >
                    Differ.to'lovlar
                  </button>
                </div>
              </div>
              <div className="credit-type-footer">
                <div className="credit-type-input">
                  <input
                    type="radio"
                    id="twenty"
                    name="persentage"
                    value="twenty"
                    defaultChecked
                    onChange={() => setSelectedValue(0.8)}
                  />
                  <label htmlFor="twenty">Boshlang'ich to'lov 20%</label>
                </div>
                <div className="credit-type-input">
                  <input
                    type="radio"
                    id="thirty"
                    name="persentage"
                    value="thirty"
                    onChange={() => setSelectedValue(0.7)}
                  />
                  <label htmlFor="thirty">Boshlang'ich to'lov 30%</label>
                </div>
                <div className="credit-type-input">
                  <input
                    type="radio"
                    id="fifty"
                    name="persentage"
                    value="fifty"
                    onChange={() => setSelectedValue(0.5)}
                  />
                  <label htmlFor="fifty">Boshlang'ich to'lov 50%</label>
                </div>
              </div>
            </div>
            <div className="credit-amount">
              <h6 className="title">Kredit miqdori</h6>
              <div className="credit-amount-range">
                <input
                  type="number"
                  className="range-amount"
                  onChange={(e) => {
                    if (e.target.value < 5000000) {
                      setCreditValue(5000000);
                    } else if (e.target.value > 400000000) {
                      setCreditValue(400000000);
                    } else {
                      setCreditValue(e.target.value);
                    }
                  }}
                  value={creditValue}
                />

                <input
                  onChange={(e) => {
                    setCreditValue(e.target.value);
                  }}
                  value={creditValue}
                  type="range"
                  min="5000000"
                  max="400000000"
                  step="1000000"
                  className="range-self"
                />
                <div className="range-self-footer">
                  <span>5 mln.</span> <span>400 mln.</span>
                </div>
              </div>
            </div>
            <div className="credit-time">
              <h6 className="title">Kredit muddati (oy)</h6>
              <div className="credit-amount-range">
                <input
                  type="number"
                  className="range-amount"
                  onChange={(e) => {
                    if (e.target.value === "" || e.target.value < 6) {
                      setCreditTime(6);
                    } else if (e.target.value > 48) {
                      setCreditTime(48);
                    } else {
                      setCreditTime(e.target.value);
                    }
                  }}
                  value={creditTime}
                />

                <input
                  onChange={(e) => setCreditTime(e.target.value)}
                  value={creditTime}
                  type="range"
                  min="6"
                  max="48"
                  step="1"
                  className="range-self"
                />
                <div className="range-self-footer">
                  <span>6 oy</span> <span>48 oy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4">
          <div className="credit-2">
            <div className="credit-card">
              <div className="credit-card-item">
                <h1>{priceFormatter_2(data[0].tum)} so'm</h1>
                <span>Oylik to'lov</span>
              </div>
              <div className="credit-card-item">
                <h1> 24,9 %</h1>
                <span>Foiz</span>
              </div>
              <div className="credit-card-item">
                <h1>{priceFormatter_2(creditSum)} so'm</h1>
                <span>Toliq foizli to'lov</span>
              </div>
              <div className="credit-card-item">
                <h1> {priceFormatter_2(allSum + creditSum)} so'm</h1>
                <span>Umumiy kredit miqdori</span>
              </div>
              <div className="credit-card-btn">
                <button onClick={() => setModalShow(true)}>
                  To'lov tartibi
                </button>
                <span>*dastlabki hisob</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
