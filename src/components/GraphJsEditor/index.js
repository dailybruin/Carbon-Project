import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import config from "../../config";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const gEditor = grapesjs.init({
      container: "#gjs",
      plugins: [gjsPresetWebpage],
      pluginsOpts: {
        gjsPresetWebpage: {},
      },
      storageManager: {
        type: "remote",
        stepsBeforeSave: 1,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeCss: true,
        storeHtml: true,
        headers: {
          "Content-Type": "application/json",
        },

        // test purpose, need to change to project endpoint
        urlStore: config.SERVER_URL + `/api/grapesStorage/storage/${id}`,

        // comment out for now because we don't have anything to load yet
        // urlLoad: config.SERVER_URL + "/api/grapesStorage/storage",
      },
    });
    setEditor(gEditor);
  }, []);

  return <div id="gjs"></div>;
};

export default withRouter(Editor);
