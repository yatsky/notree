import { loadAppDataLocal, saveAppDataLocal } from "./appData";

let content;
beforeEach(() => {
  content = {
    otherInfo: "information",
    appName: "Survey",
    pagesData: [
      {
        pageId: "initial1",
        pageName: "Introduction",
        selected: true,
        nameReadOnly: true,
        deleted: false,
        nodes: [],
      },
      {
        pageId: "initial2",
        pageName: "Survey",
        selected: false,
        nameReadOnly: true,
        deleted: false,
        nodes: [],
      },
    ],
  };

  const localStorageMock = (function () {
    let store = {};

    return {
      getItem(key) {
        return store[key];
      },

      setItem(key, value) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key) {
        delete store[key];
      },

      getAll() {
        console.log(store);
      },
    };
  })();

  localStorageMock.setItem("content", JSON.stringify(content));
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});

test("load from local content", () => {
  const data = loadAppDataLocal("content");
  expect(data).toEqual(content);
});
test("save to local content", () => {
  const newContent = { ...content, otherInfo: "save to local" };
  saveAppDataLocal(newContent);
  const data = loadAppDataLocal("content");
  expect(data).toEqual(newContent);
});
