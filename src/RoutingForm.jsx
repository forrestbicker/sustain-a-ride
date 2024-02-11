import { useEffect } from "react";
import React, { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import TimePicker from "react-time-picker";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const RoutingForm = () => {
  const originWidget = usePlacesWidget({
    apiKey: process.env.REACT_APP_GCP_KEY,
    onPlaceSelected: (place) => {
      setOrigin(place);
      console.log(place);
    },
    options: { types: [] },
  });

  const destinationWidget = usePlacesWidget({
    apiKey: process.env.REACT_APP_GCP_KEY,
    onPlaceSelected: (place) => {
      setDestination(place);
      console.log(place);
    },
    options: { types: [] },
  });
  const [origin, setOrigin] = useState({ formatted_address: "" });
  const [destination, setDestination] = useState({ formatted_address: "" });
  const [email, setEmail] = useState("");

  const handleOriginChange = (e) => {
    setOrigin(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Origin:", origin);
    console.log("Destination:", destination);
    console.log("Days:", selectedDays);
    console.log("Time:", arrivalTime);
    // split 09:00 by colon to set hour/minute in Date()
    const time = arrivalTime.split(":");
    setArrivalTimeJS(new Date(0, 0, 0, time[0], time[1]));

    console.log(origin.formatted_address, destination.formatted_address);

    // grab three responses to put in matches
    const localMatches = [];
    for (let i = 0; i < 3; ++i) {
      const response = await fetch("/api/match.py", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rideStart: origin.formatted_address,
          rideEnd: destination.formatted_address,
        }),
      });

      const data = await response.json();
      // append to matches array
      data["picture"] = ["basketball.png", "soccer.png", "tennis.png"][i];
      console.log(data);
      localMatches.push(data);
    }
    setMatches(localMatches);
    setShowModal(true);
  };

  const [arrivalTime, onChange] = useState("9:00");
  const [arrivalTimeJS, setArrivalTimeJS] = useState(new Date());
  const [showModal, setShowModal] = React.useState(false);

  // const matches = [
  //   {
  //     name: "Bob Smith",
  //     picture:
  //       "https://media.istockphoto.com/id/1263601084/vector/soccer-ball-symbol-football-ball-icon.jpg?s=612x612&w=0&k=20&c=2Y9kyn2vhU2luJtcj10IGySX4jtf41r_AraQxTT-5yM=",
  //     email: "bobsmith@gmail.com",
  //     cost: 13.14,
  //     duration: 30,
  //     message:
  //       "Hey! I'm going to be in the area for the summer and would love to give you a ride!",
  //   },
  //   {
  //     name: "Jane Doe",
  //     picture:
  //       "https://i.pinimg.com/originals/14/5e/73/145e7319bc5dacc7ea6c915a19c953a6.jpg",
  //     email: "jdoe@gmail.com",
  //     cost: 23.14,
  //     duration: 10,
  //     message:
  //       "Hey! I'm going to be in the area for the summer and would love to give you a ride!",
  //   },
  //   {
  //     name: "Tom Jones",
  //     picture:
  //       "https://media.istockphoto.com/id/1263601084/vector/soccer-ball-symbol-football-ball-icon.jpg?s=612x612&w=0&k=20&c=2Y9kyn2vhU2luJtcj10IGySX4jtf41r_AraQxTT-5yM=",
  //     email: "tjones@gmail.com",
  //     cost: 31.2,
  //     duration: 25,
  //     message:
  //       "Hey! I'm going to be in the area for the summer and would love to give you a ride!",
  //   },
  // ];
  const [matches, setMatches] = useState([]);

  const [matchNum, setMatchNum] = useState(0);
  const [iframeSrc, setIframeSrc] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.339414529721!2d-118.12745768493988!3d34.13765758058284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c4a7ea997b91%3A0x3499e7d01a61dd1a!2sCalifornia%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1677979242657!5m2!1sen!2sus"
  );

  const selectMatch = () => {
    setShowModal(false);
    setIframeSrc(matches[matchNum]?.iframe);
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="110%"
            title="map"
            src={iframeSrc}
            style={{
              filter: "contrast(1.2) opacity(0.7)",
            }}
          ></iframe>
        </div>
        {/* <div className="absolute inset-0 bg-gray-300"> */}
        <div className="container px-5 py-10 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-5 flex flex-col md:ml-auto w-full mt-3 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Find a Ride
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              Schedule recurring rides to your favorite places :)
            </p>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                onChange={handleEmailChange}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="daysPicker"
                className="leading-7 text-sm text-gray-600"
              >
                Days of the Week
              </label>
              <div className="flex justify-center items-center">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <div
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`h-12 w-12 m-2 rounded-md flex justify-center items-center cursor-pointer mx-0.5 ${
                      selectedDays.includes(day)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500 hover:bg-blue-200"
                    }`}
                  >
                    <div>{day[0]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="timePicker"
                className="leading-7 text-sm text-gray-600 pr-2"
              >
                Latest Arrival Time
              </label>
              <TimePicker
                onChange={onChange}
                value={arrivalTime}
                clearIcon={null}
                className="w-full"
                disableClock={true}
              />
            </div>
            <div className="relative mb-4">
              <div>
                <label
                  htmlFor="origin"
                  className="leading-7 text-sm text-gray-600-1"
                >
                  Origin:
                </label>
                <input
                  ref={originWidget.ref}
                  type="text"
                  id="origin"
                  name="origin"
                  placeholder=""
                  className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  // value={origin?.formatted_address}
                  onChange={handleOriginChange}
                />
                <div id="originLatLng"></div>
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="leading-7 text-sm text-gray-600"
                >
                  Destination:
                </label>
                <input
                  ref={destinationWidget.ref}
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder=""
                  className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  // value={destination?.formatted_address}
                  onChange={handleDestinationChange}
                />
                <div id="destinationLatLng"></div>
                {/* div to center button horizontally */}
                <div className="flex justify-center">
                  <button
                    className="text-white bg-purple-500 border-0 py-2 px-6 mt-2 focus:outline-none hover:bg-purple-600 rounded text-lg"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {showModal && matches.length > 2 ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-5xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      We Found 3 Potential Matches!
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <div className="relative p-6 flex-auto">
                    <section className="text-gray-600 body-font">
                      <div className="container px-5 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-2/3 sm:w-2/3 content-start sm:pr-10">
                          <div className="w-full sm:p-4 px-4 mb-6">
                            <h1 className="title-font font-medium text-xl mb-2 text-gray-900">
                              {matches[matchNum]?.people[0].name} (Match{" "}
                              {matchNum + 1})
                            </h1>
                            <div className="leading-relaxed">
                              {matches[matchNum]?.people[0].message}
                            </div>
                          </div>
                          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-2xl text-gray-900">
                              ${matches[matchNum]?.cost.toFixed(2)}
                            </h2>
                            <p className="leading-relaxed">Cost</p>
                          </div>
                          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-2xl text-gray-900">
                              {Math.floor(matches[matchNum]?.duration)} min
                            </h2>
                            <p className="leading-relaxed">Duration</p>
                          </div>
                          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-2xl text-gray-900">
                              {new Date(
                                arrivalTimeJS.getTime() -
                                  matches[matchNum]?.duration * 60000
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </h2>
                            <p className="leading-relaxed">Pickup</p>
                          </div>
                          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-2xl text-gray-900">
                              {arrivalTimeJS.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </h2>
                            <p className="leading-relaxed">Dropoff</p>
                          </div>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
                          <img
                            width={300}
                            className="object-cover object-center"
                            src={require(`./assets/profile_pics/${matches[matchNum]?.picture}`)}
                            alt="stats"
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-blue-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setMatchNum((matchNum + 1) % 3)}
                    >
                      Next Match
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => selectMatch()}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </section>
    </>
  );
};

export default RoutingForm;
