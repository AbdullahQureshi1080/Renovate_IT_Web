import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
// import axios from 'axios';
// import {storageRef} from '../../firebase';

function Image({ imageHandler, preview, onRemove, previewHide, style }) {
  let imagePreviewUrl = preview;
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img src={imagePreviewUrl} style={styles.image} />;
  } else {
    $imagePreview = (
      <div className="previewText">Please select an Image for Preview</div>
    );
  }
  return (
    <div>
      <form>
        <div style={styles.container}>
          <input
            onChange={imageHandler}
            id="file-upload"
            type="file"
            style={{ display: "none" }}
          />
          <label style={styles.icon} htmlFor="file-upload">
            <PhotoLibraryIcon style={{ fontSize: 40 }} />
          </label>
          <Button color="primary" variant="contained" onClick={onRemove}>
            remove
          </Button>
        </div>
      </form>
      {!previewHide ? <div>{$imagePreview}</div> : <div />}
    </div>
  );
}

const styles = {
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    marginTop: 30,
    height: 400
  },
  icon: {
    color: "#1b262c"
  }
};

export default Image;
