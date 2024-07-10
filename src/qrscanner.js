// versi "react-qr-reader" 1.0.0. component API harus disesuaikan dengan yg baru

// import "./styles.css";
import { useState } from "react";
import QrReader from "react-qr-reader";

const App = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div>
     <h2 className="text-[60px] pt-10">
       Booking Allocation
      
      </h2>
  

      {/* <h3>
        Last Scan:
        {selected}
      </h3> */}

      <button
  onClick={() => {
    setStartScan(!startScan);
  }}
  style={{
    padding: '10px 20px', // Adjust padding to change button size
    fontSize: '20px',    // Adjust font size
    cursor: 'pointer',   // Add cursor pointer for usability
  }}
>
  {startScan ? "Stop Scan" : "Start Scan"}
</button>

      {startScan && (
        <>
        <select
  onChange={(e) => setSelected(e.target.value)}
  style={{
    fontSize: '20px',
    marginTop:'10px',
    padding: '8px',      // Adjust padding
    width: '200px',      // Adjust width
    cursor: 'pointer',   // Add cursor pointer for usability
  }}
>
  <option value={"environment"}>Back Camera</option>
  <option value={"user"}>Front Camera</option>
</select>

          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            // chooseDeviceId={()=>selected}
            style={{ width: "300px" ,marginTop:'10px'}}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>}
    </div>
  );
};

export default App;
