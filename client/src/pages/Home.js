import { Col, message, Row, Carousel, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Bus from "../components/Bus";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

import '../resources/home.css';

const { Meta } = Card;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};



function Home() {
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);

  const getBuses = async () => {
    if (!filters.from || !filters.to) {
      return;
    }

    const tempFilters = {}; //removing values
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });

    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/buses/get-all-buses",
        tempFilters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const filteredBuses = response.data.data.filter(
          (bus) => bus.status === "Yet To Start"
        );
        setBuses(filteredBuses);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getBuses();
  }, []);


  return (
    <div>
      <Carousel autoplay effect="fade" className="Carousel">
        <div>
          <img src={require("../images/car1.png")} alt="" />
        </div>
        <div>
          <img src={require("../images/car2.png")} alt="" />
        </div>
        <div>
          <img src={require("../images/car3.png")} alt="" />
        </div>
      </Carousel>
      <div className="tkt">
        <div className="my-3 py-1 ticketbox" >
          <Row gutter={[10, 10]} align="center">
            <Col lg={24}>
              <h1>Book Your Ticket</h1>
            </Col>
            <Col lg={7} sm={24}>
              <input
                type="text"
                placeholder="From"
                value={filters.from}
                onChange={(e) => setFilters({ ...filters, from: e.target.value })}
              />
            </Col>
            <Col lg={7} sm={24}>
              <input
                type="text"
                placeholder="To"
                value={filters.to}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              />
            </Col>
            <Col lg={7} sm={24}>
              <input
                type="date"
                placeholder="Date"
                value={filters.journeyDate}
                onChange={(e) =>
                  setFilters({ ...filters, journeyDate: e.target.value })
                }
              />
            </Col>
            <Col lg={3} sm={24}>
              <div className="d-flex gap-2">
                <button className="primary-btn" onClick={() => getBuses()}>
                  Search
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div>
        
        <Row gutter={[15, 15]} className="businfo">

          
          
          <Col lg={3} sm={24} className="filterin">
            <input
              type="text"
              placeholder="Type"
              value={filters.type}
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value })
              }
            />
          </Col>
          </Row>
          <Row>
          <Col lg={3} sm={24} className="filterin">
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getBuses()}>
                Filter
              </button>
            </div>
          </Col>
          </Row>
          {buses
            .filter((bus) => bus.status === "Yet To Start")
            .map((bus) => (
              <Col lg={16} xs={24} sm={24} className="businformation">
                <Bus bus={bus} />
              </Col>
            ))
          }
          
        
        
      </div>



      <div className="travelcard">
        <div>
          <h1> A Journey of a thousand miles begins with a <span><h1>Single step</h1></span> </h1>
          <p class="text">Enjoy the following exclusive features:
            Last Minute Booking - In a hurry to book a bus at the last minute? Choose the bus passing from your
            nearest boarding point and book in a few easy steps.
            Boarding Point Navigation - Never lose your way while travelling to your boarding point!
            Comprehensive Ticket Details- Everything that you need to make the travel hassle free - rest stop
            details, boarding point images, chat with co-passengers, wake-up alarm and much more!</p>
        </div>


        <Card className="card1"
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={require("../images/Blue Animated Travel to Dubai Instagram Post (260 × 400 px).gif")} />}
        >
        </Card>
        <Card className="card2"
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={require("../images/Blue Animated Travel to Dubai Instagram Post (260 × 400 px).gif")} />}
        >
        </Card>
        <Card className="card3"
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={require("../images/Blue Animated Travel to Dubai Instagram Post (260 × 400 px).gif")} />}
        >
        </Card>

      </div>


    </div>

  );
}

export default Home;