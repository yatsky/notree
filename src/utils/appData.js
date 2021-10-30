import { initialAppData } from "../model/initialAppData";
import { DataStore } from "aws-amplify";
import { AppData } from "../models";

export const loadAppDataLocal = (key) => {
  let content = localStorage.getItem(key);
  if (content) {
    return JSON.parse(content);
  } else {
    return initialAppData;
  }
};

export const saveAppDataLocal = async (appData) => {
  // setLoadingSave(true)
  localStorage.setItem("content", JSON.stringify(appData));
  // setLoadingSave(false)
};

export const loadAppDataCloud = async (setApps) => {
  try {
    const apps = await DataStore.query(AppData);
    if (apps.length !== 0) {
      let tempApps = {};
      apps.forEach((app) => {
        console.log(app);
        tempApps[app.id] = JSON.parse(app.content);
      });
      setApps(tempApps);
      console.log(tempApps);
    }
  } catch (error) {
    console.log("Error retrieving posts", error);
  }
};

export const saveAppDataCloud = async (appData) => {
  // setLoadingSave(true)
  try {
    console.log("trying to save");
    // const original = await DataStore.query(AppData, AppData.id)
    // console.log("Original object: ", original);
    await DataStore.save(
      new AppData({
        id: "test",
        content: JSON.stringify(appData),
      })
    );
  } catch (error) {
    console.log("Error saving post", error);
  }
  // setLoadingSave(false)
};
