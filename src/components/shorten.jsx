import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Shorten = () => {
    const [status, setStatus] = useState({ status: "Please Enter Url", url: "Please Enter Url", link: "Please Enter Url" })
    const [url, setUrl] = useState("");
    const generateUrl = async () => {
        if (url !== "") {
            const result = await axios.post("https://url-backend-9ir6.onrender.com/create", { url: url });
            if (result.data.status === "Exists") {
                setStatus({ status: "Url already exists", url: result.data.shortUrl, link: result.data.originalUrl })
            }
            else {
                setStatus({ status: "Created Successfully", url: result.data.shortUrl, link: result.data.originalUrl })
            }
        }
        else{
            setStatus({ status: "Please Enter Url", url: "Please Enter Url", link: "#" })
        }
    }

    return (
        <>
            <h2>Create Short Url in a CLICK !!</h2>
            <input type="text" placeholder="enter url to shorten" onChange={(e) => { setUrl(e.target.value); setStatus({ status: "Please Enter Url", url: "Please Enter Url", link: "Please Enter Url" }) }} />
            <button type="submit" onClick={generateUrl}>Shorten</button>
            <p>Status: <span className="create-status">{status.status}</span></p>
            <p>{`Your shortened url: `}<a rel="noreferrer" target="_blank" href={status.link} className="create-url-display">{status.url}</a></p>
            <br />
            <hr />
            <h4>Already have a short url? <Link to="/check">Check here</Link></h4>
        </>
    )
}

export default Shorten;