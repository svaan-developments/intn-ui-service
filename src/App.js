import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Constants, ApiEndPoints } from "./Api";
import QrReader from "react-qr-reader";
import qrImg from "./assets/scan-barcode.svg";
import { Table, Button, Modal, Input, Space, DatePicker } from "antd";
import Logo from "./assets/logo.svg";

const App = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [dashboard, setDashboard] = useState([]);
  const [registerdetails, setregisterdetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [registerdetails1, setRegisterDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [qrScanned, setQrScanned] = useState(false); // New state to track QR scan status
  const [errorMessage, setErrorMessage] = useState("");

  const getTypeClass = (type) => {
    switch (type) {
      case "VIP":
        return "textname tableno vip";
      case "VVIP":
        return "textname tableno vvip";
      case "DELEGATES":
        return "textname tableno delegates";
      default:
        return "textname tableno";
    }
  };
  console.log(data, "data pick");

  const handleCancelClick = () => {
    setStartScan(false);
    setData("");
    setLoadingScan(false);
  };

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    axios
      .get(Constants.BaseURL + ApiEndPoints.DadhboardCount, {
        // withCredentials: true,
      })
      .then((response) => {
        console.log(response?.data);
        setDashboard(response?.data);
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(Constants.BaseURL + ApiEndPoints.Registerdetails, {
        // withCredentials: true,
      })
      .then((response) => {
        console.log(response?.data);
        setregisterdetails(response?.data);
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("Error fetching data:", error);
      });
  }, []);

  // const handleOccupiedClick = () => {
  //   const postData = {
  //     text: data, // Assuming data contains "Sanjay Madhavan :VIP:1:1"
  //   };
  //   axios
  //     .post(Constants.BaseURL + ApiEndPoints.Validatedetails, postData, {})
  //     .then((response) => {
  //       console.log("POST request success:", response);
  //     })
  //     .catch((error) => {
  //       window.alert(
  //         "An error occurred while triggering the API. Please try again later."
  //       );
  //       console.error("Error making POST request:", error);
  //     });
  //   window.location.reload();
  // };

  // const handleOccupiedClick = () => {
  //   const postData = {
  //     text: data, // Assuming data contains "Sanjay Madhavan :VIP:1:1"
  //   };

  //   axios
  //     .post(Constants.BaseURL + ApiEndPoints.Validatedetails, postData, {})
  //     .then((response) => {
  //       console.log("POST request success:", response);
  //       // Handle successful response if needed
  //     })
  //     .catch((error) => {
  //       // Handle error response
  //       if (error.response) {
  //         // Server responded with a status other than 2xx
  //         const statusCode = error.response.status;
  //         const responseBody = error.response.data;

  //         console.error("Error response status code:", statusCode);
  //         console.error("Error response data:", responseBody);

  //         if (statusCode === 400 && responseBody === "Already Occupied") {
  //           window.alert("This slot is already occupied.");
  //         } else {
  //           window.alert(
  //             `An error occurred: ${statusCode} - ${
  //               responseBody.message || "Please try again later."
  //             }`
  //           );
  //         }
  //       } else if (error.request) {
  //         // Request was made but no response was received
  //         console.error("Error request:", error.request);
  //         window.alert("No response from the server. Please try again later.");
  //       } else {
  //         // Something else caused the error
  //         console.error("Error:", error.message);
  //         window.alert("An unexpected error occurred. Please try again later.");
  //       }
  //     })
  //     .finally(() => {
  //       // Reload the page regardless of success or failure
  //       window.location.reload();
  //     });
  // };

  const handleOccupiedClick = () => {
    const postData = {
      text: data, // Assuming data contains "Sanjay Madhavan :VIP:1:1"
      userId: userId, // Include the user ID in the request
    };

    axios
      .post(Constants.BaseURL + ApiEndPoints.Validatedetails, postData, {})
      .then((response) => {
        console.log("POST request success:", response);
        setErrorMessage(""); // Clear any previous error message on success
        // You may want to handle UI updates or further actions on success
        window.location.reload();
      })

      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          const responseBody = error.response.data;

          console.error("Error response status code:", statusCode);
          console.error("Error response data:", responseBody);

          if (statusCode === 400 && responseBody === "Already Occupied") {
            alert("This QR code has already been scanned ");
            setErrorMessage("This QR code has already been scanned");
          } else {
            setErrorMessage(
              `An error occurred: ${statusCode} - ${
                responseBody.message || "Please try again later."
              }`
            );
          }
        } else if (error.request) {
          console.error("Error request:", error.request);
          alert("No response from the server. Please try again later.");
          setErrorMessage(
            "No response from the server. Please try again later."
          );
        } else {
          console.error("Error:", error.message);
          alert("An unexpected error occurred. Please try again later.");
          setErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDetails = registerdetails.filter(
    (register) =>
      register.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      register.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      register.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleClick = (userId) => {
  //   console.log("Triggering API for User ID:", userId);
  //   axios
  //     .post(Constants.BaseURL + ApiEndPoints.usertrigger, { userId })
  //     .then((response) => {
  //       console.log("API call success:", response);
  //       // Optionally update local state or perform any additional actions
  //     })
  //     .catch((error) => {
  //       console.error("Error triggering API:", error);
  //     });
  // };

  // const handleClick = (userId) => {
  //   // Construct URL with query parameter
  //   const url = `${Constants.BaseURL}${ApiEndPoints.usertrigger}?userId=${userId}`;

  //   // Make POST request with Axios
  //   axios
  //     .post(url)
  //     .then((response) => {
  //       console.log("API call success:", response.data);
  //       // Optionally update local state or perform additional actions
  //     })
  //     .catch((error) => {
  //       console.error("Error triggering API:", error);
  //       // Handle error gracefully
  //     });
  //   window.location.reload();
  // };

  const handleClick = (userId) => {
    setSelectedUserId(userId); // Store selected userId
    // Find the user data based on userId
    const userData = registerdetails.find((user) => user.userId === userId);
    setSelectedUserData(userData); // Set selected user data
    setShowPopup(true); // Show the popup
  };

  const handleConfirmAction = () => {
    if (selectedUserId) {
      const url = `${Constants.BaseURL}${ApiEndPoints.usertrigger}?userId=${selectedUserId}`;

      axios
        .post(url)
        .then((response) => {
          console.log("API call success:", response.data);
          // Optionally update local state or perform additional actions
        })
        .catch((error) => {
          console.error("Error triggering API:", error);
          // Handle error gracefully
        });

      // Close the popup after action
      setShowPopup(false);

      // Reload the page after API call (if needed)
      window.location.reload();
    }
  };
  // const handleClick = (userId) => {
  //   console.log("User ID:", userId);
  //   // Perform any additional actions with the userid
  // };

  return (
    <>
      <div className="mobileviewscroll">
        <header>
          <div className="mobilebviewhead">
            <img src={Logo} />
            <img
              className="scan-btn"
              onClick={() => {
                setStartScan(!startScan);
              }}
              src={qrImg}
            />
          </div>

          {startScan && (
            <>
              {/* Add focus to the QR scanner */}
              <QrReader
                facingMode={selected}
                onError={handleError}
                onScan={handleScan}
                autoFocus={true} // Add this line to autofocus the scanner
                style={{ width: "100%", marginTop: "10px" }}
              />
            </>
          )}

          {loadingScan && <p>Loading</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {data !== "" && (
            <div className="outer-layer">
              <div
                className="qr-data"
                style={{
                  backgroundColor:
                    data.split(":")[1] === "VVIP"
                      ? "#F14956"
                      : data.split(":")[1] === "VIP"
                      ? "#B91B58"
                      : data.split(":")[1] === "DELEGATES"
                      ? "#3B98E6"
                      : "red",
                }}
              >
                <h5>DETAILS</h5>
                <div className="main-content">
                  {data.split(":").length === 4 && (
                    <>
                      <p>{data.split(":")[0]}</p>
                      <p>{data.split(":")[1]}</p>
                      <p>Table No: {data.split(":")[2]}</p>
                    </>
                  )}

                  <button onClick={handleOccupiedClick} className="occupiedbtn">
                    occupied
                  </button>
                  <button
                    type="submit"
                    className="cancel"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        <div className="countoccupied">
          <div className="vvvipcard">
            <h3 className="vvipcolor">VVIP</h3>
            <p className="conut">
              {dashboard?.OccupiedVVIP}
              <p className="occupiedname">Occupied</p>
            </p>

            <p className="conut">
              {dashboard?.UnOccupiedVVIP}
              <p className="occupiedname1">Unoccupied</p>
            </p>
          </div>
          <div className="vvipcard">
            <h3 className="vipcolor">VIP</h3>
            <p className="conut">
              {dashboard?.OccupiedVIP}
              <p className="occupiedname">Occupied</p>
            </p>
            <p className="conut">
              {dashboard?.UnOccupiedVIP}
              <p className="occupiedname1">Unoccupied</p>
            </p>
          </div>
          <div div className="delegatescard">
            <h3 className="delegatescolor">Delegates</h3>
            <p className="conut">
              {dashboard?.OccupiedDELEGATES}
              <p className="occupiedname">Occupied</p>
            </p>
            <p className="conut">
              {dashboard?.UnOccupiedDELEGATES}
              <p className="occupiedname1">Unoccupied</p>
            </p>
          </div>
        </div>

        <div>
          <div className="register">Guest</div>
          <div className="search-input">
            <Input
              placeholder="Search Guest"
              value={searchQuery}
              onChange={handleSearch}
              className="search"
              // style={{ marginBottom: "20px", margin: "auto", width: "85%" }}
            />
          </div>
          {showPopup && selectedUserData && (
            <div className="outer-layer">
              <div className="popup">
                <div className="popup-content">
                  <h3 className="guestname">
                    Do you want to occupy this guest?
                  </h3>
                  <table className="headertable">
                    <tr>
                      <td className="textname">{selectedUserData.name}</td>
                      <td className="tableNo tablenocount">
                        {selectedUserData.tableNo !== 0
                          ? `${selectedUserData.tableNo} - T`
                          : ""}
                      </td>
                      <td className="tableNo tabledesgination">
                        {selectedUserData.designation}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className={`${getTypeClass(
                          selectedUserData.type
                        )} textname tableno`}
                      >
                        {selectedUserData.type}
                      </td>
                      <td
                        className={`tableNo ${
                          selectedUserData.isOccupied === "N"
                            ? "unoccupied"
                            : "occupied"
                        }`}
                        style={{
                          color:
                            selectedUserData.isOccupied === "N"
                              ? "#ff3d00"
                              : "#50ac08",
                        }}
                      >
                        {selectedUserData.isOccupied === "N"
                          ? "Unoccupied"
                          : "Occupied"}
                      </td>
                      <td className="tableNo">
                        {selectedUserData.organization}
                      </td>
                    </tr>
                  </table>
                  <div className="popup-buttons">
                    <button
                      className="cancel-btn"
                      onClick={() => setShowPopup(false)}
                    >
                      Cancel
                    </button>
                    <button onClick={handleConfirmAction}>Occupy</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {filteredDetails.map((register, index) => (
            <table
              key={index}
              className={`headertable ${
                register.isOccupied === "N"
                  ? "unoccupied-table"
                  : "occupied-table"
              }`}
              onClick={
                register.isOccupied === "N"
                  ? () => handleClick(register.userId)
                  : null
              }
            >
              <tr className="">
                <td className="textname">{register.name}</td>
                <td className="tableNo tablenocount">
                  {register.tableNo !== 0 ? `${register.tableNo} - T` : ""}
                </td>
                <td className="tableNo tabledesgination">
                  {register.designation}
                </td>
              </tr>
              <tr>
                <td
                  className={`${getTypeClass(register.type)} textname tableno`}
                >
                  {register.type}
                </td>
                <td
                  className={`tableNo ${
                    register.isOccupied === "N" ? "unoccupied" : "occupied"
                  }`}
                  style={{
                    color: register.isOccupied === "N" ? "#ff3d00" : "#50ac08",
                  }}
                >
                  {register.isOccupied === "N" ? "Unoccupied" : "Occupied"}
                </td>
                <td className="tableNo">{register.organization}</td>
              </tr>
            </table>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
