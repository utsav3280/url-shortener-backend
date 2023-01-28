import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const CheckCount = () => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const checkUrl = async () => {
        if (url !== "") {
            const result = await axios.get(`https://url-backend-9ir6.onrender.com/check/${url}`);
            if (result.data.status === "Success") {
                window.location.replace(result.data.url);
            }
            else {
                setError("Requested URL not found");
            }
        }
        else {
            setError("Please Enter Url");
        }
    }
    return (
        <>
            <h2>Enter short url</h2>
            <input type="text" placeholder="enter your short url" onChange={(e) => { setUrl(e.target.value) }} />
            <button onClick={checkUrl}>go</button>
            <p style={{ color: "red" }}>{error}</p>
            <br />
            <hr />
            <Link to="/">Create a new short URL</Link>
        </>
    )
}

export default CheckCount;