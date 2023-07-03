import React from "react";

export default function Footer() {
  return (
    <>
      <div className="border-top rounded" style={{backgroundColor:"rgb(240,249,250)"}}>
        <nav class="m-3 navbar  navbar-expand-lg navbar-light bg-grey">
          <div class="container">
            <a class="navbar-brand" href="/">
              Blockchain Powered @AvtarNFT
            </a>
            <div>Created by @Doni_Prathamesh</div>
          </div>
        </nav>
        <div className="mb-2 container text-center">
          Copyright © 2023 HackNovas - All rights reserved.
        </div>
      </div>
    </>
  );
}
