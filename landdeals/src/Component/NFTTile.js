import { Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils";

function NFTTile(prop) {
  const newTo = {
    pathname: "/nftPage/" + prop.data.tokenId,
  };

  const IPFSUrl = GetIpfsUrlFromPinata(prop.data.image);

  return (
    <Link to={newTo} className="col-2">
      <div className="border text-center m-2 p-2">
        <img
          src={IPFSUrl}
          alt=""
          className="w-50 border border-dark center"
          crossOrigin="anonymous"
        />
        <div className="text-dark ">
          <strong className="text-xl" style={{ "textDecoration": "none" }}>
            {prop.data.name}
          </strong>
          <p className="display-inline" style={{ "textDecoration": "none" }}>
            {prop.data.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default NFTTile;
